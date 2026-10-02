
export function Btn({ children, className = '', ...p }) {
  return (
    <button
      className={`bevel-out active:bevel-in bg-win-gray px-3 py-[1px] text-[18px] leading-5 text-black ${className}`}
      {...p}
    >
      {children}
    </button>
  );
}

export function TitleBar({ title, icon, onMin, onClose, active = true }) {
  return (
    <div
      className="flex items-center justify-between px-[3px] py-[2px] text-white"
      style={{ background: active ? 'linear-gradient(90deg,#000080,#1084d0)' : '#808080' }}
    >
      <div className="flex items-center gap-1 font-pixel text-[9px] leading-4">
        <span className="text-[13px]">{icon}</span>
        <span className="truncate">{title}</span>
      </div>
      <div className="flex gap-[2px]">
        <Btn className="!px-1 !py-0 !text-[14px] leading-3" onClick={onMin} aria-label="Minimize">_</Btn>
        <Btn className="!px-1 !py-0 !text-[14px] leading-3" onClick={onClose} aria-label="Close">x</Btn>
      </div>
    </div>
  );
}

/** Blue hyperlink that opens externally. */
export function A({ href, children }) {
  return (
    <a
      href={href}
      {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </a>
  );
}

export function Field({ label, children }) {
  return (
    <label className="mb-2 block text-[19px]">
      <span className="mb-[2px] block">{label}</span>
      {children}
    </label>
  );
}

export const fieldClass =
  'bevel-in block w-full bg-white px-2 py-[2px] text-[19px] text-black outline-none focus:bg-[#ffffe0]';

/** Classic message box. */
export function Dialog({ title, icon = 'ℹ️', children, buttons, onClose }) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/30">
      <div className="bevel-out w-[330px] bg-win-gray p-[3px]">
        <TitleBar title={title} onMin={onClose} onClose={onClose} />
        <div className="flex gap-3 p-3 text-[20px] leading-5">
          <div className="text-[28px] leading-none">{icon}</div>
          <div>{children}</div>
        </div>
        <div className="flex justify-center gap-2 pb-3">{buttons}</div>
      </div>
    </div>
  );
}

export function H1({ children }) {
  return <h1 className="mb-2 font-pixel text-[13px] leading-5 text-win-navy">{children}</h1>;
}

export function Rule() {
  return <hr className="my-3 border-0 border-t border-win-dark shadow-[0_1px_0_#fff]" />;
}
