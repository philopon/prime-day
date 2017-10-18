import "rc-calendar/assets/index.css";
import "core-js/es6/array";

import * as React from "react";
import * as ReactDOM from "react-dom";

import * as moment from "moment";
import Calendar from "rc-calendar";
import isPrime from "./prime";

moment.locale("ja-jp");

const styles: { [key: string]: React.CSSProperties } = {
    contents: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    title: { textAlign: "center" },
    wrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    table: {
        width: "13rem",
    },
    tableIndex: { textAlign: "right" },
    tableYear: { textAlign: "right" },
    tableOld: { textAlign: "right" },
};

class App extends React.Component<{}, { birthDay: moment.Moment | null }> {
    constructor(props: {}) {
        super(props);
        this.state = { birthDay: null };
    }

    *primeDay(): IterableIterator<[number, moment.Moment]> {
        if (this.state.birthDay === null) {
            return;
        }
        const birth = this.state.birthDay.clone();
        const month = birth.month();
        const day = birth.date();
        const year = birth.year();

        for (let old = 0; old < 120; old++) {
            const time = moment({ year: year + old, month, day });
            const v = time.year() * 10000 + (1 + time.month()) * 100 + time.date();
            if (isPrime(v)) {
                yield [old, time.clone()];
            }
        }
    }

    render() {
        const primes = Array.from<[number, moment.Moment]>(this.primeDay());
        return (
            <div style={styles.contents}>
                <h1 style={styles.title}>素数日のやつ</h1>
                <div style={styles.wrapper}>
                    <div>
                        <Calendar
                            value={this.state.birthDay}
                            onChange={m => this.setState({ birthDay: m })}
                        />
                    </div>
                    <table style={styles.table}>
                        <tbody>
                            {primes.map(([old, day], i) => (
                                <tr key={i}>
                                    <td style={styles.tableIndex}>{i}</td>
                                    <td style={styles.tableYear}>{day.year()}年</td>
                                    <td style={styles.tableOld}>{old}歳</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector(".mount-point"));
