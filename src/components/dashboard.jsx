import React, { Component } from "react";
import http from "../services/http";

class Dashborad extends Component {
  state = {
    data: [],
    month: 1,
    state: 0,
    statelist: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttarakhand",
      "Uttar Pradesh",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli",
      "Daman and Diu",
      "Delhi",
      "Lakshadweep",
      "Puducherry",
    ],
  };
  async componentDidMount() {
    const { data } = await http.get("/dashboard/" + this.state.state);
    this.setState({ data });
    console.log(data);
  }
  setmonth(x) {
    this.setState({ month: x });
  }
  async handlestate(x) {
    console.log(x);
    this.setState({ state: x });
    const { data } = await http.get("/dashboard/" + x);
    console.log(data);
    this.setState({ data });
  }

  render() {
    const { data, month, statelist } = this.state;
    var x = 0;
    return (
      <div>
        <h1>Dashboard</h1>
        <br />
        <form>
          <div class="form-group">
            <label htmlFor="states">
              <h2>Choose a State or UT</h2>
            </label>

            <select
              onChange={(value) => this.handlestate(value.target.value)}
              className="form-control"
              name="states"
              id="states"
            >
              {statelist.map((state) => (
                <option value={x++}>{state}</option>
              ))}
            </select>
            <br />
          </div>
        </form>

        <div>
          <button className="btn" onClick={() => this.setmonth(1)}>
            Next Month
          </button>
          {"   "}
          <button className="btn" onClick={() => this.setmonth(2)}>
            Second Month
          </button>
          {"   "}
          <button className="btn" onClick={() => this.setmonth(3)}>
            Third Month
          </button>
        </div>
        <br />
        <h3>
          Upcoming Demand of {statelist[this.state.state]} for
          {(month === 1 && " Next ") ||
            (month === 2 && " Second ") ||
            (month === 3 && " Third ")}{" "}
          Month
        </h3>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>District</th>
              <th>BPL Population</th>
              <th>Youngs</th>
              <th>Fertile Land</th>
              <th>Demands</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              (dist) =>
                dist.Month === month && (
                  <tr>
                    <th>{dist.Dist}</th>
                    <td>{dist.BPLPop}</td>
                    <td>{dist.YoungPop}</td>
                    <td>{dist.fertileLand}</td>
                    <td>{dist.Demand}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dashborad;
