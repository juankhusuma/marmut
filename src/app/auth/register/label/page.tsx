"use server";

import { handleRegisterLabel } from "@/action/handleRegisterLabel";

export default async function LabelRegisterPage() {
    return (
        <div className="flex justify-center items-center p-10">
            <form action={handleRegisterLabel} className="form-control w-1/3">
                <h1 className="text-white font-bold text-center mb-5">Form Registrasi</h1>
                <label htmlFor="email" className="label-text">Email</label>
                <input className="input-sm input-primary mb-2" type="text" name="email" />
                <label htmlFor="email" className="label-text">Password</label>
                <input className="input-sm input-primary mb-10" type="password" name="password" />
                <label htmlFor="email" className="label-text">Nama</label>
                <input className="input-sm input-primary mb-2" type="text" name="nama" />
                <label htmlFor="contact" className="label-text">Kontak</label>
                <input className="input-sm input-primary mb-2" type="contact" name="kontak" />

                <button type="submit" className="btn btn-primary mt-5 text-white font-bold">Register</button>
            </form>
        </div >
    )
}