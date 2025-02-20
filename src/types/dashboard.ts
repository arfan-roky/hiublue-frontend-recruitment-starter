export type SummaryCardProps = {
  title: string;
  value: number;
  change: number;
  previousPeriod: string;
};

export type SummaryData = {
  active_users: number;
  appearance: number;
  clicks: number;
};

export type SummaryDataResponse = {
  current: SummaryData;
  previous: SummaryData;
};

export type OffersSentData = {
  sunday: number;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
};

export type VisitDay = {
  desktop: number;
  mobile: number;
};

export type WebsiteVisitsData = {
  friday: VisitDay;
  monday: VisitDay;
  saturday: VisitDay;
  sunday: VisitDay;
  thursday: VisitDay;
  tuesday: VisitDay;
  wednesday: VisitDay;
};

export type StatData = {
  offers_sent: OffersSentData;
  website_visits: WebsiteVisitsData;
};
