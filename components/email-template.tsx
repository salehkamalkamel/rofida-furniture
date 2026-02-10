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
   PROPS
========================= */

interface RovidaOrderEmailProps {
  username?: string;
  orderId: number | string;
  orderStatus?: string;
  paymentMethod?: string;
  ctaUrl?: string;
}

/* =========================
   COMPONENT
========================= */

export const EmailTemplate = ({
  username = "عميلنا العزيز",
  orderId,
  orderStatus = "قيد المراجعة",
  paymentMethod = "الدفع عند الاستلام",
  ctaUrl = "https://www.rofida-furniture.com/account/orders",
}: RovidaOrderEmailProps) => (
  <Html dir="rtl" lang="ar">
    <Head />
    <Preview>{`تم استلام طلبك رقم #${orderId} بنجاح`}</Preview>

    <Body style={main}>
      <Container style={container}>
        {/* ================= HEADER ================= */}
        <Section style={header}>
          <Text style={brand}>روفيدا للأثاث</Text>
          <Text style={brandSub}>تصميمات عملية • جودة تدوم</Text>
        </Section>

        {/* ================= CONTENT ================= */}
        <Section style={content}>
          <Heading style={h1}>مرحباً {username} 👋</Heading>

          <Text style={paragraph}>
            نشكرك لاختيارك <strong>روفيدا للأثاث</strong> 🤍
            <br />
            تم استلام طلبك بنجاح، ويجري حالياً مراجعته وتجهيزه للتنفيذ.
          </Text>

          {/* ===== ORDER SUMMARY ===== */}
          <Section style={summaryBox}>
            <Text style={summaryRow}>
              <strong>رقم الطلب:</strong> #{orderId}
            </Text>
            <Text style={summaryRow}>
              <strong>حالة الطلب:</strong> {orderStatus}
            </Text>
            <Text style={summaryRow}>
              <strong>طريقة الدفع:</strong> {paymentMethod}
            </Text>
          </Section>

          <Text style={paragraph}>
            سنقوم بإشعارك فور بدء عملية الشحن، مع إرسال جميع تفاصيل التوصيل.
          </Text>

          {/* ===== CTA ===== */}
          <Section style={ctaContainer}>
            <Link href={ctaUrl} style={ctaButton}>
              عرض تفاصيل الطلب ومتابعته
            </Link>
          </Section>
        </Section>

        {/* ================= SUPPORT ================= */}
        <Section style={supportSection}>
          <Text style={supportText}>
            هل لديك أي استفسار؟
            <br />
            فريق روفيدا جاهز لمساعدتك دائماً.
          </Text>

          <Link href="mailto:support@rofida-furniture.com" style={supportLink}>
            support@rofida-furniture.com
          </Link>
        </Section>

        {/* ================= FOOTER ================= */}
        <Section style={footer}>
          <Hr style={hr} />
          <Text style={footerText}>
            © {new Date().getFullYear()} روفيدا للأثاث — جميع الحقوق محفوظة
          </Text>

          <Text style={footerLinks}>
            <Link href="https://www.rofida-furniture.com" style={footerLink}>
              الموقع الإلكتروني
            </Link>
            {" • "}
            <Link
              href="https://www.rofida-furniture.com/privacy"
              style={footerLink}
            >
              سياسة الخصوصية
            </Link>
            {" • "}
            <Link
              href="https://www.rofida-furniture.com/terms"
              style={footerLink}
            >
              الشروط والأحكام
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

/* =========================
   STYLES
========================= */

const main = {
  backgroundColor: "#f4f4f4",
  fontFamily: "'Cairo', 'Tajawal', 'Segoe UI', Tahoma, Arial, sans-serif",
  textAlign: "right" as const,
};

const container = {
  maxWidth: "600px",
  margin: "40px auto",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  overflow: "hidden",
  border: "1px solid #e5e5e5",
};

/* Header */
const header = {
  padding: "30px",
  backgroundColor: "#000000",
};

const brand = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "800",
  margin: "0",
};

const brandSub = {
  color: "#facc15",
  fontSize: "13px",
  marginTop: "6px",
};

/* Content */
const content = {
  padding: "32px 28px",
};

const h1 = {
  fontSize: "22px",
  fontWeight: "700",
  margin: "0 0 16px 0",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "1.7",
  color: "#333333",
  margin: "0 0 20px 0",
};

/* Summary */
const summaryBox = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e5e5",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "20px",
};

const summaryRow = {
  fontSize: "14px",
  margin: "0 0 6px 0",
};

/* CTA */
const ctaContainer = {
  textAlign: "center" as const,
  marginTop: "28px",
};

const ctaButton = {
  backgroundColor: "#0070bb",
  color: "#ffffff",
  padding: "14px 28px",
  fontSize: "14px",
  fontWeight: "700",
  textDecoration: "none",
  borderRadius: "6px",
  display: "inline-block",
};

/* Support */
const supportSection = {
  padding: "24px 28px",
  backgroundColor: "#f9f9f9",
  textAlign: "center" as const,
};

const supportText = {
  fontSize: "13px",
  color: "#333333",
  marginBottom: "6px",
};

const supportLink = {
  fontSize: "13px",
  color: "#000000",
  fontWeight: "700",
  textDecoration: "underline",
};

/* Footer */
const footer = {
  padding: "24px 28px",
};

const hr = {
  borderColor: "#e5e5e5",
  marginBottom: "16px",
};

const footerText = {
  fontSize: "11px",
  color: "#666666",
  marginBottom: "10px",
};

const footerLinks = {
  fontSize: "11px",
  color: "#666666",
};

const footerLink = {
  color: "#666666",
  textDecoration: "underline",
};
