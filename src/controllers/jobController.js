const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/jobUtils");
module.exports = {
  save: async function (req, res) {
    // const jobs = await Job.get();

    // const lastId = jobs[jobs.length - 1]?.id || 0;

    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(),
    });

    return res.redirect("/");
  },
  create: function (req, res) {
    return res.render("job");
  },
  show: async function (req, res) {
    const jobId = req.params.id;
    const jobs = await Job.get();

    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("Job not found!");
    }

    const profile = await Profile.get();

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },
  update: async function (req, res) {
    const jobId = req.params.id;
    // const jobs = await Job.get();

    // const job = jobs.find((job) => Number(job.id) === Number(jobId)); // Used only on Front-End

    // if (!job) {
    //   return res.send("Job not found!");
    // }

    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };

    // const newJobs = jobs.map((job) => {
    //   if (Number(job.id) === Number(jobId)) { Used only on Front end
    //     job = updatedJob;
    //   }
    //   return job;
    // });

    await Job.update(updatedJob, jobId);

    res.redirect("/job/" + jobId);
  },
  delete: async function (req, res) {
    const jobId = req.params.id;

    await Job.delete(jobId);

    return res.redirect("/");
  },
};
