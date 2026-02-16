import Nav from "@/components/nav";
// import Footer from "@/components/footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Nav />
            {children}
            {/* <Footer /> */}
        </div>
    )
}