export default function BaseFormInput({ label, id, color, Icon }) {
    return (
        <label htmlFor={id} className="flex flex-col space-y-1 mt-4">
            <span className="text-m font-bold" style={{ color }}>{label}</span>
            <div className="relative">
                <input
                    id={id}
                    type="text"
                    className="border border-none rounded-lg p-2 pl-3 pr-10 w-full bg-white font-semibold focus:outline-none focus:ring-0"
                    style={{color}}
                />
                {Icon && <Icon 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg" 
                    style={{ color }} 
                />}
            </div>
        </label>
    );
}
