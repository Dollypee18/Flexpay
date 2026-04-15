type FilterTab = {
  label: string;
  value: string;
  count?: number;
};

interface FilterTabsProps {
  tabs: FilterTab[];
  active: string;
  onChange: (value: string) => void;
}

export default function FilterTabs({
  tabs,
  active,
  onChange,
}: FilterTabsProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        backgroundColor: "#161616",
        border: "1px solid #2A2A2A",
        borderRadius: "6px",
        padding: "4px",
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            style={{
              padding: "6px 14px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: isActive ? 500 : 400,
              color: isActive ? "#F0F0F0" : "#888888",
              backgroundColor: isActive ? "#2A2A2A" : "transparent",
              border: "none",
              cursor: "pointer",
              transition: "all 0.1s",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                style={{
                  fontSize: "11px",
                  color: isActive ? "#888888" : "#555555",
                  fontFamily: "DM Mono, monospace",
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
