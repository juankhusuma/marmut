import Link from "next/link";

export default function LabelRegisterPage() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body items-center">
                    <h1 className="card-title text-center mb-5">Register</h1>
                    <div className="card-actions w-1/2 gap-y-3 justify-center items-center flex-col">
                        <Link href="/auth/register/user" className="btn text-white font-bold w-full btn-primary">Pengguna</Link>
                        <Link href="/auth/register/label" className="btn text-white font-bold w-full btn-primary">Label</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}