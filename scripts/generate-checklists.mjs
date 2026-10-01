import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";

const checklists = [
  {
    file: "campuslync-assignment-review-checklist.pdf",
    title: "Assignment review checklist",
    subtitle: "A final review for work that remains your own.",
    sections: [
      [
        "Purpose and structure",
        [
          "I have answered the task that was set.",
          "My introduction states the focus and direction.",
          "Each paragraph has a clear purpose.",
          "My conclusion answers the central question without adding new evidence.",
        ],
      ],
      [
        "Evidence and argument",
        [
          "I have supported key claims with appropriate evidence.",
          "I have explained how evidence connects to my argument.",
          "I have distinguished my analysis from source material.",
          "I have checked factual claims and quotations against their sources.",
        ],
      ],
      [
        "Referencing and presentation",
        [
          "In-text citations and the reference list match.",
          "I have followed the required referencing style.",
          "Headings, tables and figures are labelled consistently.",
          "I have completed spelling, grammar and formatting checks.",
        ],
      ],
      [
        "Before submission",
        [
          "I have checked the word count and submission instructions.",
          "I understand my institution's rules on external support and AI.",
          "I have removed comments and tracked changes where required.",
          "I have kept a backup of the submitted version.",
        ],
      ],
    ],
  },
  {
    file: "campuslync-dissertation-planning-checklist.pdf",
    title: "Dissertation planning checklist",
    subtitle: "Turn a large research project into manageable decisions.",
    sections: [
      [
        "Research direction",
        [
          "My topic is focused enough for the available time and word count.",
          "I can state the problem or question clearly.",
          "I have discussed feasibility and scope with my supervisor.",
          "I understand the intended contribution of the project.",
        ],
      ],
      [
        "Literature and method",
        [
          "I have a repeatable search strategy for relevant sources.",
          "I record citations and notes as I work.",
          "My proposed method fits the research question.",
          "I have identified ethics, permissions and data requirements.",
        ],
      ],
      [
        "Project plan",
        [
          "I have milestones for reading, data work, drafting and revision.",
          "I have allowed time for supervisor feedback.",
          "I keep decisions, changes and questions in a research log.",
          "I have a secure backup routine for files and data.",
        ],
      ],
      [
        "Writing and review",
        [
          "Each chapter has a clear job in the overall argument.",
          "I separate description, evidence and analysis.",
          "I verify referencing and presentation requirements early.",
          "I remain responsible for every part of the submitted dissertation.",
        ],
      ],
    ],
  },
  {
    file: "campuslync-graduate-cv-checklist.pdf",
    title: "Graduate CV checklist",
    subtitle: "Make your experience clear, relevant and honest.",
    sections: [
      [
        "Focus",
        [
          "The CV is tailored to a specific role or type of opportunity.",
          "My most relevant evidence is easy to find.",
          "The opening section is specific rather than generic.",
          "I use language that reflects the role without copying claims.",
        ],
      ],
      [
        "Evidence",
        [
          "I describe what I did, how I did it and the result where possible.",
          "I include relevant projects, part-time work and volunteering.",
          "Every achievement is accurate and can be discussed in an interview.",
          "Dates, job titles and qualifications are consistent.",
        ],
      ],
      [
        "Presentation",
        [
          "Headings and spacing make the document easy to scan.",
          "Bullet points begin with clear action language.",
          "Formatting is consistent and works when exported to PDF.",
          "Contact details are current and professional.",
        ],
      ],
      [
        "Final checks",
        [
          "I have checked spelling and grammar carefully.",
          "The file name includes my name and CV.",
          "I have removed sensitive or unnecessary personal information.",
          "I have tested every link and asked someone to review clarity.",
        ],
      ],
    ],
  },
  {
    file: "campuslync-moving-to-london-checklist.pdf",
    title: "Moving to London checklist",
    subtitle: "A practical prompt list for planning your move.",
    sections: [
      [
        "Before choosing accommodation",
        [
          "I have confirmed my campus location and expected timetable.",
          "My budget includes rent, bills, transport and initial costs.",
          "I have compared commute time as well as distance.",
          "I know which questions to ask each accommodation provider.",
        ],
      ],
      [
        "Before committing",
        [
          "I have verified the provider and reviewed the full terms.",
          "I understand deposits, payment dates and what is included.",
          "I know who handles repairs and how to report problems.",
          "I will seek qualified advice for legal or financial questions.",
        ],
      ],
      [
        "Travel and arrival",
        [
          "I have confirmed my arrival route and access arrangements.",
          "Important documents and contact details are available offline.",
          "I have essentials for the first 48 hours.",
          "Someone I trust knows my travel and accommodation details.",
        ],
      ],
      [
        "First week",
        [
          "I have completed university enrolment and induction tasks.",
          "I know the route to campus and nearby essentials.",
          "I have checked the official steps relevant to my circumstances.",
          "I know how to contact university wellbeing and student support.",
        ],
      ],
    ],
  },
];

const escape = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
const artworkFiles = {
  assignment: "academic-development.webp",
  dissertation: "academic-development.webp",
  graduate: "career-progression.webp",
  moving: "london-living.webp",
};
function artworkData(file) {
  const key = Object.keys(artworkFiles).find((word) => file.includes(word));
  const image = artworkFiles[key];
  return `data:image/webp;base64,${readFileSync(path.resolve("public/artwork", image)).toString("base64")}`;
}
function documentHtml(item) {
  const sections = item.sections
    .map(
      ([heading, points]) =>
        `<section><h2>${escape(heading)}</h2>${points.map((point) => `<p><span></span>${escape(point)}</p>`).join("")}</section>`,
    )
    .join("");
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;color:#082b53;font-family:Arial,sans-serif;background:#fff}.top{height:18px;background:linear-gradient(90deg,#056ad7,#0da6bd,#20b77a)}main{position:relative;padding:42px 48px}.brand{font-weight:800;font-size:22px;letter-spacing:-.5px}.tag{color:#257e89;font-size:10px;letter-spacing:1.7px;text-transform:uppercase;margin-top:5px}.cover-art{position:absolute;right:38px;top:31px;width:210px;height:125px;object-fit:contain}h1{max-width:430px;font-size:34px;line-height:1.08;margin:58px 0 8px;letter-spacing:-1px}.sub{color:#526b78;font-size:13px;margin:0 0 28px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}section{border:1px solid #d8e5e9;border-radius:10px;padding:18px}h2{font-size:15px;margin:0 0 13px}section p{display:flex;gap:9px;align-items:flex-start;color:#344f60;font-size:10px;line-height:1.5;margin:8px 0}section p span{display:block;flex:0 0 12px;width:12px;height:12px;border:1px solid #7fabb0;border-radius:2px;margin-top:1px}.note{margin-top:25px;padding:13px 16px;border-radius:8px;background:#eff8f7;color:#345b63;font-size:9.5px;line-height:1.5}.footer{display:flex;justify-content:space-between;margin-top:25px;color:#71848d;font-size:8px}.footer strong{color:#087f92}
  </style></head><body><div class="top"></div><main><div class="brand">CampusLync</div><div class="tag">Study. Settle. Succeed.</div><img class="cover-art" src="${artworkData(item.file)}" alt=""><h1>${escape(item.title)}</h1><p class="sub">${escape(item.subtitle)}</p><div class="grid">${sections}</div><div class="note">Use this checklist as a planning aid and adapt it to your institution, provider or circumstances. CampusLync guidance does not replace university rules or qualified legal, financial or immigration advice.</div><div class="footer"><span>CampusLync student resources</span><strong>Supporting students, wherever they study.</strong></div></main></body></html>`;
}

const out = path.resolve("public/downloads");
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
for (const item of checklists) {
  await page.setContent(documentHtml(item), { waitUntil: "load" });
  await page.pdf({
    path: path.join(out, item.file),
    format: "A4",
    printBackground: true,
  });
}
await browser.close();
console.log(`Generated ${checklists.length} checklists in ${out}`);
