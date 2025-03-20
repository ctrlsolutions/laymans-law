interface LawyerInfoProps {
    name?: string;
    address?: string;
    email?: string;
    contactNumber?: string;
    gender?: string;
    birthday?: string;
    imageUrl?: string; // Optional image URL
}

const LawyerInfo: React.FC<LawyerInfoProps> = ({
    name = "Atty. Your Name",
    address = "Your Address",
    email = "Your Email",
    contactNumber = "Your Contact Number",
    gender = "Your Gender",
    birthday = "Your Birthday",
    imageUrl = "/DefaultProfileLawyer.png", // Default image from public folder
}) => {
    return (
        <div className="relative w-[490px] h-[450px] mx-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-300">
            {/* Profile Picture (Overlapping the Card) */}
            <div className="absolute -top-28 left-1/2 transform -translate-x-1/2">
                <div className="w-[220px] h-[220px] rounded-full border-4 border-white shadow-md overflow-hidden">
                    <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Content */}
            <div className="pt-[6rem] ">
                <h2 className="text-2xl font-bold text-center">{name}</h2>
                <p className="text-purple-800 font-bold text-2xl text-center">Lawyer</p>

                <div className="pt-[2rem] pl-[2rem] font-bold text-lg space-y-2">
                    <p className="flex items-center justify-start"><span className="mr-2">📍</span>{address}</p>
                    <p className="flex items-center justify-start"><span className="mr-2">✉️</span>{email}</p>
                    <p className="flex items-center justify-start"><span className="mr-2">📞</span>{contactNumber}</p>
                    <p className="flex items-center justify-start"><span className="mr-2">👤</span>{gender}</p>
                    <p className="flex items-center justify-start"><span className="mr-2">🎂</span>{birthday}</p>
                </div>
            </div>
        </div>
    );
};

export default LawyerInfo;
