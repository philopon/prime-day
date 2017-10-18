declare module "rc-calendar" {
    import { Moment } from "moment";
    export interface CalendarProps {
        value: Moment | null;
        onChange: (day: Moment) => void;
    }
    export default class Calendar extends React.Component<CalendarProps> {}
}
