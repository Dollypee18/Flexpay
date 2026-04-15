interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        backgroundColor: "#1E1E1E",
        border: "1px solid #2A2A2A",
        borderRadius: "6px",
        padding: "8px 12px",
        fontSize: "13px",
        color: "#F0F0F0",
        outline: "none",
        width: "220px",
      }}
    />
  );
}
