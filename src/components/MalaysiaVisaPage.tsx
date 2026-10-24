import React from 'react';
import { CountryVisaPage, CountryVisaPageProps } from './CountryVisaPage';

export const MalaysiaVisaPage: React.FC<CountryVisaPageProps> = (props) => {
  return <CountryVisaPage {...props} countryName="Malaysia" />;
};

export default MalaysiaVisaPage;
