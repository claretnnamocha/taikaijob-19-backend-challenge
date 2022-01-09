import { v4 as uuid } from "uuid";
import { JobSchema } from "../types/models";

const { BASEURL } = process.env;

export const jobAlertMail = (jobs: Array<JobSchema>) => {
  return `
    <p>
      <span style="display: none !important">${uuid()}</span>
    </p>
    <b>Job recommendations for you</b><br>
    <span style="display: none !important">${uuid()}</span>
    ${jobs.map(
      ({ title, description, skills, type, planet, country }) => `
      <p>
        <b>${title}</b><br/>
        ${description}<br/>
        ${type}<br/>
        ${skills.join(", ")}<br/>
        ${country}, ${planet}<br/>
      </p>
    `
    )}
    <span style="display: none !important">${uuid()}</span>
    `;
};

export const registrationMail = ({ email }) => {
  const link = `${BASEURL}/deactivate?email=${email}`;
  return `
  <p>
    Dear ${email},
    <span style="display: none !important">${uuid()}</span>
  </p>
  Your registration on this Job alert service is successful.<br>
  <span style="display: none !important">${uuid()}</span>
  <p>
    To stop receiving our amazing alerts, click here <a href="${link}">${link}</a>
    <span style="display: none !important">${uuid()}</span>
  </p>
  <p>
    Clicking this link will deactivate the job alerts for ${email}
    <span style="display: none !important">${uuid()}</span>
  </p>
  <span style="display: none !important">${uuid()}</span>
      `;
};

export const deactivateMail = ({ email }) => {
  const link = `${BASEURL}/activate?email=${email}`;
  return `
    <p>
      Dear ${email},
      <span style="display: none !important">${uuid()}</span>
    </p>
    Your request to disable your Job alert service is successful.<br>
    <span style="display: none !important">${uuid()}</span>
    <p>
      To start receiving our amazing alerts once more, click here <a href="${link}">${link}</a>
      <span style="display: none !important">${uuid()}</span>
    </p>
    <p>
      Clicking this link will activate the job alerts for ${email}
      <span style="display: none !important">${uuid()}</span>
    </p>
    <span style="display: none !important">${uuid()}</span>
  `;
};

export const activateMail = ({ email }) => {
  const link = `${BASEURL}/deactivate?email=${email}`;
  return `
    <p>
      Dear ${email},
      <span style="display: none !important">${uuid()}</span>
    </p>
    Your to request to enable your Job alert service is successful.<br>
    <span style="display: none !important">${uuid()}</span>
    <p>
      To stop receiving our amazing alerts, click here <a href="${link}">${link}</a>
      <span style="display: none !important">${uuid()}</span>
    </p>
    <p>
      Clicking this link will deactivate the job alerts for ${email}
      <span style="display: none !important">${uuid()}</span>
    </p>
    <span style="display: none !important">${uuid()}</span>
  `;
};
