"use client"

import { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  phone: string
  joinDate: string
  ordersCount: number
  totalSpent: number
  status: 'active' | 'inactive' | 'blocked'
  statusText: string
}

const mockUsers: User[] = [
  {
    id: 'USR-001',
    name: 'أحمد محمد',
    email: 'ahmed@email.com',
    phone: '+20 123 456 7890',
    joinDate: '2025-06-15',
    ordersCount: 12,
    totalSpent: 45890,
    status: 'active',
    statusText: 'نشط'
  },
  {
    id: 'USR-002',
    name: 'فاطمة أحمد',
    email: 'fatma@email.com',
    phone: '+20 100 200 3000',
    joinDate: '2025-08-20',
    ordersCount: 8,
    totalSpent: 28500,
    status: 'active',
    statusText: 'نشط'
  },
  {
    id: 'USR-003',
    name: 'محمد علي',
    email: 'mohamed@email.com',
    phone: '+20 111 222 3333',
    joinDate: '2025-09-10',
    ordersCount: 5,
    totalSpent: 15200,
    status: 'active',
    statusText: 'نشط'
  },
  {
    id: 'USR-004',
    name: 'سارة حسن',
    email: 'sara@email.com',
    phone: '+20 155 666 7777',
    joinDate: '2025-10-05',
    ordersCount: 3,
    totalSpent: 8900,
    status: 'inactive',
    statusText: 'غير نشط'
  },
  {
    id: 'USR-005',
    name: 'منى عبدالله',
    email: 'mona@email.com',
    phone: '+20 188 999 0000',
    joinDate: '2025-11-12',
    ordersCount: 2,
    totalSpent: 6500,
    status: 'blocked',
    statusText: 'محظور'
  },
  {
    id: 'USR-006',
    name: 'أحمد محمود',
    email: 'ahmed.m@email.com',
    phone: '+20 122 333 4444',
    joinDate: '2025-12-01',
    ordersCount: 4,
    totalSpent: 12300,
    status: 'active',
    statusText: 'نشط'
  }
]

type UserStatus = 'all' | 'active' | 'inactive' | 'blocked'

const statusFilters: { value: UserStatus; label: string }[] = [
  { value: 'all', label: 'جميع المستخدمين' },
  { value: 'active', label: 'نشط' },
  { value: 'inactive', label: 'غير نشط' },
  { value: 'blocked', label: 'محظور' }
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [statusFilter, setStatusFilter] = useState<UserStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showBlockModal, setShowBlockModal] = useState<string | null>(null)

  const filteredUsers = users.filter(user => {
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesSearch = user.name.includes(searchQuery) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery)
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success'
      case 'inactive':
        return 'bg-muted text-muted-foreground'
      case 'blocked':
        return 'bg-offer/10 text-offer'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    const statusTextMap: Record<User['status'], string> = {
      active: 'نشط',
      inactive: 'غير نشط',
      blocked: 'محظور'
    }
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: newStatus, statusText: statusTextMap[newStatus] }
        : user
    ))
    if (selectedUser?.id === userId) {
      setSelectedUser({ ...selectedUser, status: newStatus, statusText: statusTextMap[newStatus] })
    }
    setShowBlockModal(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">المستخدمين</h1>
        <p className="text-muted-foreground">إدارة حسابات المستخدمين</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-background p-4">
          <p className="text-sm text-muted-foreground">إجمالي المستخدمين</p>
          <p className="text-2xl font-bold text-foreground">{users.length}</p>
        </div>
        <div className="bg-background p-4">
          <p className="text-sm text-muted-foreground">نشطين</p>
          <p className="text-2xl font-bold text-success">{users.filter(u => u.status === 'active').length}</p>
        </div>
        <div className="bg-background p-4">
          <p className="text-sm text-muted-foreground">غير نشطين</p>
          <p className="text-2xl font-bold text-muted-foreground">{users.filter(u => u.status === 'inactive').length}</p>
        </div>
        <div className="bg-background p-4">
          <p className="text-sm text-muted-foreground">محظورين</p>
          <p className="text-2xl font-bold text-offer">{users.filter(u => u.status === 'blocked').length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-background p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="البحث بالاسم أو البريد أو الهاتف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pr-10 pl-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as UserStatus)}
          className="h-12 px-4 bg-muted border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {statusFilters.map(filter => (
            <option key={filter.value} value={filter.value}>{filter.label}</option>
          ))}
        </select>
      </div>

      {/* Users Count */}
      <p className="text-sm text-muted-foreground">
        عرض {filteredUsers.length} من {users.length} مستخدم
      </p>

      {/* Users Table */}
      <div className="bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">المستخدم</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">تاريخ الانضمام</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">الطلبات</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">إجمالي الإنفاق</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">الحالة</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-foreground">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {new Date(user.joinDate).toLocaleDateString('ar-EG', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{user.ordersCount} طلب</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{user.totalSpent.toLocaleString('ar-EG')} جنيه</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.statusText}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        title="عرض التفاصيل"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {user.status !== 'blocked' ? (
                        <button
                          onClick={() => setShowBlockModal(user.id)}
                          className="p-2 text-offer hover:bg-offer/10 transition-colors"
                          title="حظر المستخدم"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(user.id, 'active')}
                          className="p-2 text-success hover:bg-success/10 transition-colors"
                          title="إلغاء الحظر"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p className="text-muted-foreground">لا يوجد مستخدمين مطابقين</p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">تفاصيل المستخدم</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-muted transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-foreground">{selectedUser.name}</p>
                  <span className={`px-2 py-0.5 text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                    {selectedUser.statusText}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">البريد الإلكتروني</span>
                  <span className="text-foreground">{selectedUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الهاتف</span>
                  <span className="text-foreground">{selectedUser.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">تاريخ الانضمام</span>
                  <span className="text-foreground">
                    {new Date(selectedUser.joinDate).toLocaleDateString('ar-EG')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">عدد الطلبات</span>
                  <span className="text-foreground">{selectedUser.ordersCount} طلب</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">إجمالي الإنفاق</span>
                  <span className="font-bold text-foreground">
                    {selectedUser.totalSpent.toLocaleString('ar-EG')} جنيه
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                {selectedUser.status !== 'blocked' ? (
                  <button
                    onClick={() => {
                      setShowBlockModal(selectedUser.id)
                      setSelectedUser(null)
                    }}
                    className="flex-1 h-12 bg-offer text-offer-foreground font-medium hover:opacity-90 transition-opacity"
                  >
                    حظر المستخدم
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusChange(selectedUser.id, 'active')}
                    className="flex-1 h-12 bg-success text-background font-medium hover:opacity-90 transition-opacity"
                  >
                    إلغاء الحظر
                  </button>
                )}
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-6 h-12 border border-border text-foreground font-medium hover:bg-muted transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Block User Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-foreground mb-4">حظر المستخدم</h3>
            <p className="text-muted-foreground mb-6">
              هل أنت متأكد من حظر هذا المستخدم؟ لن يتمكن من تسجيل الدخول أو إجراء طلبات جديدة.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowBlockModal(null)}
                className="px-4 py-2 text-sm font-medium text-foreground border border-border hover:bg-muted transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleStatusChange(showBlockModal, 'blocked')}
                className="px-4 py-2 text-sm font-medium bg-offer text-offer-foreground hover:opacity-90 transition-opacity"
              >
                حظر المستخدم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
