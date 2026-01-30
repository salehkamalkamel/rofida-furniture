export default function NewsletterBanner() {
  return (
    <section className="py-14 bg-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-right">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              اشترك في نشرتنا البريدية
            </h2>
            <p className="text-muted-foreground max-w-md">
              احصل على أحدث العروض والمنتجات الجديدة مباشرة في بريدك الإلكتروني
            </p>
          </div>

          <form className="flex w-full max-w-md">
            <input
              type="email"
              required
              placeholder="البريد الإلكتروني"
              className="flex-1 h-12 px-4 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="h-12 px-6 bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
            >
              اشتراك
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
