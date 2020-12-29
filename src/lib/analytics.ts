import ReactGA from "react-ga";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const initGA = (): void => {
  console.log("GA init");
  ReactGA.initialize(GA_ID);
};

export const logPageView = (): void => {
  console.log(`Logging pageview for ${window.location.pathname}`);
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = "", action = ""): void => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = "", fatal = false): void => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
