import Headers from "@/components/Headers"

export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <Headers/>   
        {children}
      </section>
    )
  }