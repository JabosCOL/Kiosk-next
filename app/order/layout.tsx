import OrderSideBar from "@/components/order/OrderSideBar";
import OrderSummary from "@/components/order/OrderSummary";
import ToastNotification from "@/components/ui/ToastNotification";

export default function OrderLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div className="md:flex">
                <OrderSideBar />
                <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
                    {children}
                </main>
                <OrderSummary />
                <ToastNotification />
            </div>
        </>
    );
}