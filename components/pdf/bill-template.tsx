import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "IBM Plex Sans Arabic",
  src: "/public/fonts/IBMPlexSansArabic-Regular.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    family: "IBM Plex Sans Arabic",
    direction: "rtl",
    textAlign: "right",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  section: {
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 6,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row-reverse",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
  },
  colName: { flex: 3 },
  colQty: { flex: 1, textAlign: "center" },
  colPrice: { flex: 1, textAlign: "right" },
  total: {
    marginTop: 16,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export function BillTemplate({ order, items }: any) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>فاتورة شراء</Text>

        <Text>رقم الطلب: #{order.id}</Text>
        <Text>
          التاريخ: {new Date(order.createdAt).toLocaleDateString("ar-EG")}
        </Text>

        <View style={{ marginTop: 16 }}>
          <Text>عنوان الشحن:</Text>
          <Text>{order.shippingAddress.fullName}</Text>
          <Text>{order.shippingAddress.street}</Text>
          <Text>
            {order.shippingAddress.city} - {order.shippingAddress.state}
          </Text>
          <Text>هاتف: {order.shippingAddress.phone}</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          {items.map((item: any) => (
            <View key={item.id} style={styles.row}>
              <Text style={styles.colName}>{item.productName}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>
                {Number(item.price).toLocaleString("ar-EG")} ج.م
              </Text>
            </View>
          ))}
        </View>

        <Text style={{ marginTop: 20, fontSize: 14 }}>
          الإجمالي: {Number(order.totalAmount).toLocaleString("ar-EG")} ج.م
        </Text>
      </Page>
    </Document>
  );
}
