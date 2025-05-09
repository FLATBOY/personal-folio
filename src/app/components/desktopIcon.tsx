import React, { useRef } from 'react';

type DesktopIconProps = {
    iconId: string;
    icon: string;
    label: string;
    position: { x: number; y: number };
    onDoubleClick: () => void;
    selected?: boolean;
    onClick?: () => void;
    onDrag?: (newPos: { x: number; y: number }) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, position, onDoubleClick, selected, onClick, onDrag }) => {
    const iconRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!iconRef.current || !onDrag) return;
        const startX = e.clientX;
        const startY = e.clientY;
        const origX = position.x;
        const origY = position.y;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;
            onDrag({ x: origX + dx, y: origY + dy });
        };

        const handleMouseUp = () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <div
            ref={iconRef}
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                cursor: "pointer",
                zIndex: selected ? 2 : 1,
            }}
            onDoubleClick={onDoubleClick}
            onClick={onClick}
            onMouseDown={handleMouseDown}
            tabIndex={0}
            className={selected ? "flex flex-col items-center justify-items-center" : "flex flex-col items-center justify-items-center"}
        >
            <img src={icon} alt={label} className="w-10 h-10" />
            <span className={selected ? "text-white  bg-[#164DBC] bg-opacity-50 px-2 rounded mt-1 ": "text-white  bg-opacity-50  object-cover shadow-2xl px-2 rounded mt-1"}>{label}</span>
        </div>
    )
}

export default DesktopIcon;