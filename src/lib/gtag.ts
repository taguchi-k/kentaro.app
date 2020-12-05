export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const existsGAID = GA_ID !== "";

/**
 * PVを測定する
 * @param path
 */
export const pageview = (path: string): void => {
  window.gtag("config", GA_ID, {
    page_path: path,
  });
};

/**
 * GAイベントを発火させる
 * @param param
 */
export const event = ({
  action,
  category,
  label,
  value = "",
}: {
  action: "event";
  category: string;
  label: string;
  value: string;
}): void => {
  if (!existsGAID) {
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};
