import { handleUserRegister } from "@/action/handleUserRegister";

export default function UserRegistrationPage() {
    return (
        <div className="flex justify-center items-center p-10">
            <form action={handleUserRegister} className="form-control w-1/3">
                <h1 className="text-white font-bold text-center mb-5">Form Registrasi</h1>
                <label htmlFor="email" className="label-text">Email</label>
                <input className="input-sm input-primary mb-2" type="text" name="email" />
                <label htmlFor="email" className="label-text">Password</label>
                <input className="input-sm input-primary mb-10" type="password" name="password" />
                <label htmlFor="email" className="label-text">Nama</label>
                <input className="input-sm input-primary mb-2" type="text" name="nama" />
                <label htmlFor="gender" className="label-text">Gender</label>
                <select name="gender" className="select-sm select-primary mb-2">
                    <option value="1">Laki-laki</option>
                    <option value="0">Perempuan</option>
                </select>
                <label htmlFor="tempat_lahir" className="label-text">Tempat Lahir</label>
                <input className="input-sm input-primary mb-2" type="text" name="tempat_lahir" />
                <label htmlFor="tanggal_lahir" className="label-text">Tanggal Lahir</label>
                <input className="input-sm input-primary mb-2" type="date" name="tanggal_lahir" />
                <label htmlFor="kota_asal" className="label-text">Kota Asal</label>
                <input className="input-sm input-primary mb-10" type="text" name="kota_asal" />

                <label htmlFor="role" className="label-text mb-2 text-white">Role</label>
                <div className="form-control mb-5 gap-y-2">
                    <div className="flex gap-2">
                        <input className="checkbox [--chkfg:white] checkbox-primary" type="checkbox" name="role" value="podcaster" />
                        <label htmlFor="podcaster">Podcaster</label>
                    </div>
                    <div className="flex gap-2">
                        <input className="checkbox [--chkfg:white] checkbox-primary" type="checkbox" name="role" value="artist" />
                        <label htmlFor="artist">Artist</label>
                    </div>
                    <div className="flex gap-2">
                        <input className="checkbox [--chkfg:white] checkbox-primary" type="checkbox" name="role" value="songwriter" />
                        <label htmlFor="songwriter">Songwriter</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-5 text-white font-bold">Register</button>
            </form>
        </div>
    )
}