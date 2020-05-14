import React from 'react';

import { ReportWidgetWrapper as Wrapper } from './Wrapper';

type Props = {
  label: string;
  data: {
    label: string;
    value: number;
  }[];
  details: string;
};

export const ReportWidget: React.FC<Props> = React.memo(
  ({ label, data, details }) => {
    return (
      <Wrapper>
        <h3 className="isoWidgetLabel">{label}</h3>

        <div className="isoReportsWidgetBar">
          {data.map((val, index) => (
            <p>
              {val}
              {index}
            </p>
          ))}
        </div>

        <p className="isoDescription">{details}</p>
      </Wrapper>
    );
  },
);
