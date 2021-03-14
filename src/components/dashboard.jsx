import React, { Component } from "react";
import http from "../services/http";
import jwtDecode from "jwt-decode";

class Dashborad extends Component {
  state = {
    data: [],
    month: 0,
    state: "",
    user: {},
    statelist: ["UP", "MP", "Maharastra"],
  };
  async componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = await jwtDecode(jwt);
      this.setState({ user, state: user.state });
      console.log(user);
    } catch (ex) {}
    const { data } = await http.get("/dashboard/" + this.state.state);
    this.setState({ data });
    console.log(data);
  }
  setmonth(x) {
    this.setState({ month: x });
  }
  async handlestate(x) {
    console.log(x);
    this.setState({ state: x, data: [] });
    const { data } = await http.get("/dashboard/" + x);
    console.log(data);
    this.setState({ data });
  }

  render() {
    const { data, month, statelist, user } = this.state;
    var x = -1;
    return (
      <div>
        <br />
        <h1>Dashboard</h1>
        <br />
        {user.level === "Central" && (
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
                  <option value={state}>{state}</option>
                ))}
              </select>
              <br />
            </div>
          </form>
        )}

        <div>
          <button className="btn" onClick={() => this.setmonth(0)}>
            Next Month
          </button>
          {"   "}
          <button className="btn" onClick={() => this.setmonth(1)}>
            Second Month
          </button>
          {"   "}
          <button className="btn" onClick={() => this.setmonth(2)}>
            Third Month
          </button>
        </div>
        <br />
        <h3>
          Upcoming Demand of {this.state.state} for
          {(month === 0 && " Next ") ||
            (month === 1 && " Second ") ||
            (month === 2 && " Third ")}{" "}
          Month
        </h3>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>State</th>
              <th>District</th>
              <th>Date</th>
              <th>Demands</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              (dist) =>
                ++x % 3 === month && (
                  <tr>
                    <th>{dist.State}</th>
                    <td>{dist.Dist}</td>
                    <td>
                      {(month === 0 && "30-04-2021") ||
                        (month === 1 && "31-05-2021") ||
                        (month === 2 && "30-06-2021")}
                    </td>
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
