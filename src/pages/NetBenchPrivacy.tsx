import { Seo } from "@/components/Seo";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";
import {
  NETBENCH_CONTACT_EMAIL,
  NETBENCH_DEVELOPER,
  NETBENCH_ISSUES_URL,
  NETBENCH_POLICY_UPDATED,
  NETBENCH_REPO_URL,
} from "@/netbench/app";

const NetBenchPrivacy = () => (
  <LegalLayout
    backTo={{ path: "/netbench", label: "NetBench" }}
    title="NetBench privacy policy"
    updated={NETBENCH_POLICY_UPDATED}
  >
    <Seo path="/netbench/privacy" />

    <LegalSection title="Summary">
      <p>
        NetBench is an HTTP load-testing app developed by {NETBENCH_DEVELOPER}. It works entirely on
        your device. <strong>We do not collect, store, sell or share any personal data.</strong> There
        is no account, no analytics, no advertising, no crash reporting and no NetBench server the app
        talks to.
      </p>
      <p>
        This policy applies to the NetBench apps for Android and iOS, and to the desktop and browser
        builds published from the{" "}
        <a href={NETBENCH_REPO_URL} target="_blank" rel="noreferrer">
          NetBench source repository
        </a>
        .
      </p>
    </LegalSection>

    <LegalSection title="Data stored on your device">
      <p>To do its job, NetBench keeps the following data locally, in the app's private storage:</p>
      <ul>
        <li>
          <strong>Scenarios</strong> you create: name, target URL, request methods and paths, request
          headers and request bodies.
        </li>
        <li>
          <strong>Run reports</strong>: timings, request counts, status codes, error counts and the
          scenario the run was made with.
        </li>
        <li>
          <strong>Settings</strong>: theme and interface language.
        </li>
      </ul>
      <p>
        This data never leaves your device unless you choose to export or share it. Scenarios can be
        deleted in the app; uninstalling the app removes all of the data above. Request headers you enter — for example an{" "}
        <code className="font-mono text-foreground">Authorization</code> token — are stored as plain
        text inside the app's sandbox, so prefer short-lived test credentials.
      </p>
    </LegalSection>

    <LegalSection title="Network requests">
      <p>
        NetBench only sends HTTP requests to the target addresses you configure in a scenario or in a
        quick test, using the headers and bodies you provide. Those servers receive your requests along
        with the usual technical information any HTTP client exposes, such as your IP address. How they
        process it is governed by the operator of that server, not by us.
      </p>
      <p>
        The app does not contact any other server: there are no third-party SDKs that send data, and no
        background network activity outside a test run you start.
      </p>
    </LegalSection>

    <LegalSection title="Exporting and sharing">
      <p>
        On mobile, <strong>Share report</strong> copies a text summary of a run to the clipboard; on the
        desktop you can export a report to a JSON, CSV or HTML file in a location you pick. Both happen
        only when you ask for them, and what you do with the copied text or file afterwards is up to you.
      </p>
    </LegalSection>

    <LegalSection title="Permissions">
      <ul>
        <li>
          <strong>Internet access</strong> — required to send test requests to your targets. This is the
          only permission the Android app requests.
        </li>
        <li>
          <strong>Unencrypted (http://) connections</strong> — allowed on Android and iOS so you can test
          local and staging servers. NetBench uses them only for targets you enter with an{" "}
          <code className="font-mono text-foreground">http://</code> address.
        </li>
      </ul>
    </LegalSection>

    <LegalSection title="Children">
      <p>
        NetBench is a developer tool and is not directed at children under 13. Since we do not collect
        any data, we do not knowingly collect data from children either.
      </p>
    </LegalSection>

    <LegalSection title="Your rights">
      <p>
        We hold no data about you, so there is nothing for us to access, correct, export or delete on our
        side. All data NetBench keeps is under your control on your device: delete scenarios in the app,
        or uninstall the app to remove everything.
      </p>
    </LegalSection>

    <LegalSection title="Changes to this policy">
      <p>
        If a future version adds a feature that processes data off the device — for example optional
        synchronisation of scenarios between your devices — this policy will be updated before that
        version is released, and the feature will be opt-in. The date at the top of the page shows when
        the policy last changed.
      </p>
    </LegalSection>

    <LegalSection title="Contact">
      <p>
        Questions about this policy can be raised in{" "}
        <a href={NETBENCH_ISSUES_URL} target="_blank" rel="noreferrer">
          NetBench issues on GitHub
        </a>
        {NETBENCH_CONTACT_EMAIL ? (
          <>
            {" "}
            or sent to <a href={`mailto:${NETBENCH_CONTACT_EMAIL}`}>{NETBENCH_CONTACT_EMAIL}</a>
          </>
        ) : null}
        .
      </p>
    </LegalSection>
  </LegalLayout>
);

export default NetBenchPrivacy;
