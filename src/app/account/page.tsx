import { AccountPage } from "@/components/Pages/Account";
import { Metadata } from "next";

export const metada: Metadata = {
    title: "Minha conta"
}

const Account = () => <AccountPage />

export default Account;