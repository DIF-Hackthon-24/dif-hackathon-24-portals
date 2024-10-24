import { useEffect, useState } from "react";
import PrefTabContent from "./PrefTabContent";
import {
  hotelSearchPreferencesTabAttributes,
  hotelStayPreferencesTabAttributes,
  diningPreferencesTabAttributes
} from "@/app/constants";

type PreferencesCardProps = {};

export default function PreferencesCard(props: PreferencesCardProps) {
  const tabs = [
    { name: "Hotel Search" },
    { name: "Hotel Stay" },
    { name: "Dining Experience" }
  ];

  const [currentTab, setCurrentTab] = useState<string>(tabs[0].name);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleTabClick = (tabName: string) => {
    console.log("Setting current tab to ", tabName);
    setCurrentTab(tabName);
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case "Hotel Search":
        return (
          <PrefTabContent
            key="hotelSearch"
            protocol="hotelSearchPreferences"
            attributes={hotelSearchPreferencesTabAttributes}
          />
        );
      case "Hotel Stay":
        return (
          <PrefTabContent
            key="hotelStay"
            protocol="hotelStayPreferences"
            attributes={hotelStayPreferencesTabAttributes}
          />
        );
      case "Dining Experience":
        return (
          <PrefTabContent
            key="dining"
            protocol="diningPreferences"
            attributes={diningPreferencesTabAttributes}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-4 sm:px-0">
      <h3 className="text-base font-semibold leading-7 text-gray-900">
        Alex's Preferences
      </h3>
      <div className="mt-3 sm:mt-4">
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                className={classNames(
                  tab.name === currentTab
                    ? "border-cyan-500 text-cyan-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
                )}
                onClick={() => handleTabClick(tab.name)}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
      {renderTabContent()}
    </div>
  );
}
