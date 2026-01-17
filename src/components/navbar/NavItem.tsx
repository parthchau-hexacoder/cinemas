type NavLink = "home" | "ticket";

interface NavItemProps {
    item: NavLink;
    isActive: boolean;
    onClick: (item: NavLink) => void;
}

export default function NavItem({ item, isActive, onClick }: NavItemProps) {
    return (
        <div
            onClick={() => onClick(item)}
            className="relative text-blue-600 font-medium cursor-pointer transition-colors duration-200"
        >
            {item === "home" ? "Home" : "My Ticket"}

            <span
                className={`absolute left-0 -bottom-2 h-0.5 bg-blue-600 rounded transition-all duration-300 ease-out 
                ${isActive ? "w-full opacity-100" : "w-0 opacity-0"}
            `}
            />
        </div>
    );
}