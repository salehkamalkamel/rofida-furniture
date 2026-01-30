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

interface RovidaEmailProps {
  username?: string;
  mainText?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export const EmailTemplate = ({
  username = "العميل",
  mainText = "لقد تم استلام طلبك بنجاح في نظامنا. سيتم معالجة البيانات وتأكيد الشحنة قريباً.",
  ctaText = "عرض تفاصيل الطلب",
  ctaUrl = "https://rofida-furniture.vercel.app/orders",
}: RovidaEmailProps) => (
  <Html dir="rtl">
    <Head />
    <Preview>تحديث من روفيدا للاثاث - ROVIDA_SYS</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header/Logo Section */}
        <Section style={headerSection}>
          <Text style={logo}>ROVIDA_SYS.</Text>
        </Section>

        {/* Status Badge */}
        <Section style={statusBadgeContainer}>
          <Text style={statusBadge}>[ SYSTEM_NOTIFICATION_2026 ]</Text>
        </Section>

        {/* Main Content Area */}
        <Section style={contentBox}>
          <Heading style={h1}>مرحباً، {username}</Heading>

          <Text style={textBody}>{mainText}</Text>

          {/* Brutalist CTA Button */}
          <Section style={btnContainer}>
            <Link href={ctaUrl} style={button}>
              {ctaText}
            </Link>
          </Section>
        </Section>

        {/* Secondary Info Area */}
        <Section style={terminalSection}>
          <Text style={terminalHeader}>// سجل العمليات</Text>
          <Text style={terminalText}>
            ID: {Math.random().toString(36).toUpperCase().substring(2, 10)}
            <br />
            LOC: CAI_EGY_01
            <br />
            STATUS: AUTHENTICATED
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Hr style={hr} />
          <Text style={footerText}>
            روفيدا للاثاث — تصميم صناعي للأجيال القادمة.
          </Text>
          <Link href="https://rofida-furniture.vercel.app" style={footerLink}>
            الخصوصية
          </Link>
          {" | "}
          <Link href="https://rofida-furniture.vercel.app" style={footerLink}>
            الشروط
          </Link>
          <Text style={copyright}>
            © 2026 ROVIDA_FURNITURE. ALL_SYSTEMS_GO.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

/* --- STYLES --- */

const main = {
  backgroundColor: "#f4f4f4", // Light gray background
  fontFamily: "Arial, sans-serif",
  textAlign: "right" as const,
};

const container = {
  margin: "40px auto",
  width: "600px",
  backgroundColor: "#ffffff",
  border: "2px solid #000000",
};

const headerSection = {
  padding: "30px",
  backgroundColor: "#000000",
};

const logo = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "900",
  letterSpacing: "-1px",
  margin: "0",
};

const statusBadgeContainer = {
  padding: "10px 30px",
  backgroundColor: "#eeeeee",
  borderBottom: "1px solid #000000",
};

const statusBadge = {
  fontSize: "10px",
  fontWeight: "bold",
  color: "#666666",
  margin: "0",
  fontFamily: "monospace",
};

const contentBox = {
  padding: "40px 30px",
};

const h1 = {
  fontSize: "32px",
  fontWeight: "900",
  color: "#000000",
  lineHeight: "1.2",
  margin: "0 0 20px 0",
};

const textBody = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333333",
  borderRight: "4px solid #FACC15", // Primary yellow accent
  paddingRight: "15px",
};

const btnContainer = {
  marginTop: "30px",
};

const button = {
  backgroundColor: "#000000",
  color: "#ffffff",
  padding: "18px 30px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "bold",
  display: "inline-block",
  boxShadow: "6px 6px 0px 0px #FACC15", // The signature offset shadow
};

const terminalSection = {
  padding: "20px 30px",
  backgroundColor: "#f9f9f9",
  borderTop: "2px solid #000000",
};

const terminalHeader = {
  fontSize: "12px",
  fontWeight: "bold",
  color: "#000000",
  margin: "0 0 5px 0",
};

const terminalText = {
  fontSize: "11px",
  fontFamily: "monospace",
  color: "#888888",
  margin: "0",
};

const footer = {
  padding: "0 30px 40px 30px",
};

const hr = {
  borderColor: "#e5e5e5",
  margin: "20px 0",
};

const footerText = {
  fontSize: "12px",
  color: "#000000",
  fontWeight: "bold",
};

const footerLink = {
  fontSize: "10px",
  color: "#666666",
  textDecoration: "underline",
};

const copyright = {
  fontSize: "10px",
  color: "#aaaaaa",
  marginTop: "20px",
  fontFamily: "monospace",
};
