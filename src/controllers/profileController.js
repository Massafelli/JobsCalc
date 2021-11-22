const Profile = require("../model/Profile");
module.exports = {
  index: async function (req, res) {
    return res.render("profile", { profile: await Profile.get() });
  },
  update: async function (req, res) {
    const data = req.body;
    const weeksPerYear = 52;
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

    const monthlyTotalHours = weekTotalHours * weeksPerMonth;

    const valueHour = data["monthly-budget"] / monthlyTotalHours;

    const profile = await Profile.get();

    await Profile.update({
      ...profile,
      ...req.body,
      "value-hour": valueHour,
    });

    return res.redirect("/profile");
  },
};
