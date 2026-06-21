import type { LegalPageCopy } from "@/components/marketing/legal-page";

const lastUpdated = "June 19, 2026";
const contact = "hello@nue.orthg.nl";

export const legalCopy = {
  terms: {
    badge: "TERMS",
    title: "Terms of Use",
    description: "Basic terms for using Nue’s website, waitlist, and early-access product.",
    lastUpdated,
    sections: [
      {
        title: "Overview",
        body: [
          "These Terms describe the basic rules for using Nue’s website, waitlist, and any early-access versions of the Nue product. Nue is an early-access, privacy-first, local-first personal agent OS. Features may change, be incomplete, or be unavailable while the product is being developed.",
          "By using the website, joining the waitlist, or using an early-access version of Nue, you agree to use the service responsibly and in accordance with these Terms."
        ]
      },
      {
        title: "Early access",
        body: [
          "Nue is currently in early access. Desktop installers have not yet been released. Accounts, cloud sync, team features, integrations, and other product capabilities may be introduced later.",
          "Early-access software may contain bugs, interruptions, data loss risks, or incomplete functionality. You should not rely on Nue for critical, emergency, legal, medical, financial, or other high-risk use cases."
        ]
      },
      {
        title: "Website and waitlist use",
        body: ["You may use the Nue website to learn about the product and join the waitlist. When joining the waitlist, you may provide information such as your email address, preferred platform, and source information."],
        bullets: ["Do not misuse the website or attempt unauthorized access.", "Do not interfere with the operation of the website or waitlist.", "Do not submit information that is unlawful, harmful, or misleading."]
      },
      {
        title: "AI and agent limitations",
        body: [
          "Nue may use AI models, model providers, local tools, or connected services now or in the future. AI systems can produce incorrect, incomplete, or unexpected results.",
          "You are responsible for reviewing outputs and approving any consequential actions before they are taken. Nue should not be treated as a substitute for professional advice or human judgment."
        ]
      },
      {
        title: "Accounts, cloud, and team features",
        body: ["Accounts, cloud features, and team functionality are planned but may not be available yet. Additional terms or product-specific policies may apply when those features are introduced."]
      },
      {
        title: "Acceptable use",
        body: ["You may not use Nue or its website to:"],
        bullets: ["Violate applicable laws or regulations.", "Harm, exploit, or deceive others.", "Attempt to bypass security or access controls.", "Interfere with the service or other users.", "Generate or distribute unlawful, abusive, or infringing content."]
      },
      {
        title: "Third-party services",
        body: ["Nue may connect to third-party model providers, tools, platforms, or service providers. Third-party services may have their own terms and privacy practices. Nue is not responsible for third-party services outside its control."]
      },
      {
        title: "Intellectual property",
        body: [
          "The Nue website, brand, design, text, software, and related materials are owned by Nue or its licensors, unless otherwise stated. These Terms do not grant you ownership of Nue intellectual property.",
          "You keep ownership of content and data you provide, subject to the permissions needed for Nue to operate the website, waitlist, and product."
        ]
      },
      {
        title: "No warranties and limitation of liability",
        body: [
          "Nue is provided on an “as is” and “as available” basis, especially during early access. We do not guarantee that Nue will be error-free, uninterrupted, secure, or suitable for any particular purpose.",
          "To the extent permitted by law, Nue is not liable for indirect, incidental, special, consequential, or punitive damages, or for loss of data, profits, business, or goodwill arising from your use of the website or product."
        ]
      },
      {
        title: "Changes and contact",
        body: [`We may update these Terms as the product and website evolve. Questions about these Terms can be sent to ${contact}.`]
      }
    ]
  },
  privacy: {
    badge: "PRIVACY",
    title: "Privacy Policy",
    description: "How Nue handles personal information for the website, waitlist, and early-access product.",
    lastUpdated,
    sections: [
      {
        title: "Overview",
        body: ["Nue is being built as a privacy-first, local-first personal agent OS. This Privacy Policy explains the basic types of personal information we may collect, how we use it, and the choices available to you."]
      },
      {
        title: "Information we collect",
        body: ["For the waitlist, we may collect email address, preferred platform, referral or source information, and basic technical information needed to operate and protect the website. As the product develops, we may collect additional information if you create an account, use cloud features, join a team, connect providers, or enable integrations."]
      },
      {
        title: "Waitlist data",
        body: ["Waitlist data is stored to manage interest in Nue, communicate product updates, understand demand by platform, and invite users to early access when appropriate. The waitlist currently stores information such as email, platform, and source using service infrastructure such as Turso."]
      },
      {
        title: "How we use information",
        bullets: ["Manage the waitlist and send early-access invitations.", "Operate, maintain, and secure the website.", "Understand general interest in Nue by platform and source.", "Respond to questions or support requests.", "Comply with legal obligations."]
      },
      {
        title: "Local-first product direction",
        body: ["Nue is intended to keep user data local where possible. Some future features, such as accounts, cloud sync, team collaboration, model provider connections, or tool integrations, may require data to be sent to Nue systems or third-party providers. Where practical, we aim to make these flows clear and user-controlled."]
      },
      {
        title: "AI providers and model training",
        body: ["Nue may connect to model providers and external tools in the future. If you choose to connect or use those services, relevant data may be sent to them to perform the requested action.", "Nue does not use your personal data or private user content to train models unless you explicitly opt in, if that is offered as a product option. Third-party model providers may have their own data handling terms depending on the provider and configuration."]
      },
      {
        title: "Service providers and sharing",
        body: ["We may use service providers to help operate the website, waitlist, infrastructure, email delivery, analytics, security, and support. These providers may process information on our behalf and should only use it for the services they provide to us. We do not sell personal information."]
      },
      {
        title: "Retention and deletion",
        body: [`We keep personal information only as long as reasonably needed for the purposes described in this policy, unless a longer period is required by law. You may ask us to remove your waitlist information by contacting ${contact}.`]
      },
      {
        title: "Your rights and choices",
        body: [`Depending on where you live, you may have rights to access, correct, delete, restrict, or object to certain processing of your personal information. To make a request, contact ${contact}. We may need to verify your request before acting on it.`]
      },
      {
        title: "Security, children, and changes",
        body: ["We take reasonable steps to protect personal information, but no system is perfectly secure. Please avoid sending sensitive information through the waitlist or general contact email.", "Nue is not intended for children, and we do not knowingly collect personal information from children. We may update this Privacy Policy as Nue develops."]
      }
    ]
  },
  dataUse: {
    badge: "DATA USE",
    title: "Data Use Policy",
    description: "A plain-language explanation of how Nue expects to handle user data, AI data flows, and waitlist information.",
    lastUpdated,
    sections: [
      {
        title: "Overview",
        body: ["Nue is an early-access, privacy-first, local-first personal agent OS. This Data Use Policy explains, at a basic level, how we expect data to be used across the website, waitlist, and future product features."]
      },
      {
        title: "Core principles",
        bullets: ["Keep data local where practical.", "Collect only what is reasonably needed.", "Be clear when data leaves the user’s device.", "Let users approve consequential actions.", "Do not train models on private user data unless the user explicitly opts in."]
      },
      {
        title: "Website and waitlist data",
        body: ["When you join the waitlist, we may collect your email address, preferred platform, and source information. This helps us manage interest, plan platform support, and contact people about early access. Waitlist data may be stored with infrastructure providers, including Turso."]
      },
      {
        title: "Product data",
        body: ["Desktop installers are not yet released. When product versions become available, Nue may process data locally on your device as part of its local-first design.", "Future features such as accounts, cloud sync, team collaboration, backups, integrations, or remote access may involve sending some data to Nue systems or third-party services. These features should explain what data is involved before use where practical."]
      },
      {
        title: "AI model use",
        body: ["Nue may connect to local models, hosted model providers, or user-selected model services. Data sent to a model provider may include prompts, instructions, files, context, tool results, or other information needed to complete a requested task.", "Users should avoid sending sensitive information to model providers unless they understand and accept that provider’s terms and data practices."]
      },
      {
        title: "No model training without opt-in",
        body: ["Nue does not use private user content or personal data for model training unless the user explicitly opts in, if that option is made available. This does not automatically control how third-party model providers handle data. Provider-specific settings and terms may apply."]
      },
      {
        title: "Tools, integrations, and consequential actions",
        body: ["Nue may support connections to tools, apps, files, accounts, or services in the future. When connected, Nue may need to read, write, summarize, search, or act on data from those tools to perform user-requested tasks.", "Actions such as sending messages, modifying files, making purchases, changing settings, or interacting with external systems can have real-world effects. Nue should ask for user approval before taking consequential actions where practical. Users remain responsible for reviewing actions before approval."]
      },
      {
        title: "Analytics, diagnostics, retention, and sharing",
        body: [`We may use basic analytics, logs, or diagnostics to understand website performance, reliability, abuse prevention, and product quality. Waitlist data is retained while it is useful for managing early access and communications, unless deletion is requested or retention is otherwise required. Requests can be sent to ${contact}.`, "We may share data with service providers that help operate Nue, such as infrastructure, database, hosting, email, analytics, security, and support providers. We do not sell personal information."]
      }
    ]
  },
  security: {
    badge: "SECURITY",
    title: "Security",
    description: "Basic information about Nue’s security approach, early-access limitations, and vulnerability reporting.",
    lastUpdated,
    sections: [
      {
        title: "Overview",
        body: ["Nue is an early-access, privacy-first, local-first personal agent OS. Security is an important part of the product direction, but Nue is still under development and should not be treated as hardened enterprise software."]
      },
      {
        title: "Security approach",
        bullets: ["Prefer local processing where possible.", "Minimize unnecessary data collection.", "Limit access to production systems.", "Use reputable service providers.", "Review sensitive product flows as they are developed.", "Make consequential actions visible for user approval."]
      },
      {
        title: "Early-access limitations",
        body: ["Because Nue is in early access, some security controls, reviews, documentation, or processes may still be evolving. Desktop installers have not yet been released, and accounts, cloud, and team features are coming soon.", "Users should avoid using early-access versions for highly sensitive, regulated, critical, or production-dependent workflows unless they understand the risks."]
      },
      {
        title: "Local-first design",
        body: ["Nue is designed to keep user data local where practical. Future features may allow data to sync, back up, or move through cloud systems, model providers, or integrations when users enable those capabilities. When data leaves the device, Nue should make that clear where practical."]
      },
      {
        title: "AI and tool safety",
        body: ["Nue may connect to model providers and tools in the future. AI systems can make mistakes, misunderstand instructions, or produce unsafe recommendations. Users should review AI outputs and approve consequential actions before they occur, especially actions involving files, accounts, communications, purchases, or external systems."]
      },
      {
        title: "Service providers and certification claims",
        body: ["Nue may rely on third-party service providers for hosting, databases, email, infrastructure, analytics, support, and security. These providers may process limited data as needed to provide their services.", "Nue does not currently claim SOC 2, ISO 27001, HIPAA, GDPR certification, or similar compliance certifications on this page. Any future certification, audit, or compliance claim should be reviewed before publication."]
      },
      {
        title: "User responsibilities",
        bullets: ["Use strong device and account security.", "Review permissions before connecting tools.", "Avoid unnecessary sensitive data in prompts or integrations.", "Keep installed software up to date.", "Verify AI-generated outputs before acting on them."]
      },
      {
        title: "Vulnerability reporting and incident response",
        body: [`If you believe you have found a security vulnerability, please report it to ${contact}. Until a dedicated security channel exists, include a brief description, safe reproduction steps, affected URLs or versions, potential impact, and contact information for follow-up.`, "Please avoid accessing, modifying, deleting, or sharing data that does not belong to you. If we identify a security issue affecting users, we will take reasonable steps to investigate, reduce risk, and notify affected users where appropriate."]
      }
    ]
  }
} satisfies Record<string, LegalPageCopy>;
