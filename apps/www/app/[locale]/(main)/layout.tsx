import { Footer } from "@/components/footer";
import Nav from "@/components/nav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Nav />
            {children}
            <Footer />
        </div>
    )
}