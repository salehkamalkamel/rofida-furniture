import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

/* =========================
   CONFIG & MAPPING
========================= */

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

interface StatusConfig {
  label: string;
  description: string;
  color: string;
}

const STATUS_MAP: Record<OrderStatus, StatusConfig> = {
  pending: {
    label: "قيد الانتظار",
    description: "طلبك مسجل لدينا وهو بانتظار المراجعة.",
    color: "#6b7280",
  },
  processing: {
    label: "قيد التجهيز",
    description: "نحن نقوم الآن بتجهيز قطع الأثاث الخاصة بك بكل حب.",
    color: "#0070bb",
  },
  shipped: {
    label: "تم الشحن",
    description: "طلبك في الطريق إليك الآن! سيتواصل معك مندوب الشحن قريباً.",
    color: "#facc15",
  },
  delivered: {
    label: "تم التوصيل",
    description:
      "نتمنى أن تنال قطع الأثاث الجديدة إعجابك وتضيف لمسة جمال لمنزلك.",
    color: "#10b981",
  },
  cancelled: {
    label: "تم الإلغاء",
    description: "تم إلغاء طلبك. إذا كنت تعتقد أن هناك خطأ، يرجى التواصل معنا.",
    color: "#ef4444",
  },
};

interface OrderStatusEmailProps {
  username?: string;
  orderId: string | number;
  status: OrderStatus;
  ctaUrl?: string;
}

/* =========================
   COMPONENT
========================= */

export const OrderStatusEmail = ({
  username = "عميلنا العزيز",
  orderId,
  status,
  ctaUrl = "https://www.rofida-furniture.com/account/orders",
}: OrderStatusEmailProps) => {
  const config = STATUS_MAP[status];

  return (
    <Html dir="rtl" lang="ar">
      <Head />
      <Preview>{`تحديث بخصوص طلبك رقم #${orderId}: ${config.label}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={brand}>روفيدا للأثاث</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Heading style={h1}>مرحباً {username} 👋</Heading>
            <Text style={paragraph}>هناك تحديث جديد بخصوص حالة طلبك:</Text>

            {/* Status Badge */}
            <Section style={{ ...statusBadge, backgroundColor: config.color }}>
              <Text style={statusLabel}>{config.label}</Text>
            </Section>

            <Text style={paragraph}>
              {config.description}
              <br />
              <strong>رقم الطلب:</strong> #{orderId}
            </Text>

            <Section style={ctaContainer}>
              <Link href={ctaUrl} style={ctaButton}>
                تتبع حالة الطلب
              </Link>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={hr} />
            <Text style={footerText}>
              © {new Date().getFullYear()} روفيدا للأثاث
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderStatusEmail;

/* =========================
   STYLES (Simplified for brevity)
========================= */
const main = {
  backgroundColor: "#f4f4f4",
  fontFamily: "Tahoma, Arial, sans-serif",
  textAlign: "right" as const,
};
const container = {
  maxWidth: "600px",
  margin: "40px auto",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  border: "1px solid #e5e5e5",
};
const header = {
  padding: "20px",
  backgroundColor: "#000000",
  textAlign: "center" as const,
};
const brand = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0",
};
const content = { padding: "30px" };
const h1 = { fontSize: "20px", margin: "0 0 15px 0" };
const paragraph = { fontSize: "15px", lineHeight: "1.6", color: "#444" };
const statusBadge = {
  padding: "10px 20px",
  borderRadius: "30px",
  display: "inline-block",
  marginBottom: "20px",
};
const statusLabel = {
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "0",
};
const ctaContainer = { textAlign: "center" as const, marginTop: "25px" };
const ctaButton = {
  backgroundColor: "#000",
  color: "#fff",
  padding: "12px 25px",
  textDecoration: "none",
  borderRadius: "5px",
  fontSize: "14px",
};
const footer = { padding: "20px", textAlign: "center" as const };
const footerText = { fontSize: "12px", color: "#999" };
const hr = { borderColor: "#eee", margin: "20px 0" };
