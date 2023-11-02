import { ReactNode } from "react";

export default function ProductLayout({
    children, }
    :{
        children: ReactNode
    }) {
        return (
            <section>
                {children}
            </section>
        )
}