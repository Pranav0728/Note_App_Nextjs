import Headers from "@/components/Headers"

export default function NotesLayout({
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