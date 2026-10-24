import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";
import {
  NETBENCH_CONTACT_EMAIL,
  NETBENCH_DEVELOPER,
  NETBENCH_ISSUES_URL,
  NETBENCH_POLICY_UPDATED,
  NETBENCH_REPO_URL,
} from "@/netbench/app";

const NetBenchTerms = () => (
  <LegalLayout
    backTo={{ path: "/netbench", label: "NetBench" }}
    title="NetBench terms of use"
    updated={NETBENCH_POLICY_UPDATED}
  >
    <Seo path="/netbench/terms" />

    <LegalSection title="About these terms">
      <p>
        These terms apply to your use of the NetBench app, developed by {NETBENCH_DEVELOPER}. By
        installing or using NetBench you agree to them. If you obtained the app from the App Store or
        Google Play, that store's own terms apply as well. The NetBench source code is published on{" "}
        <a href={NETBENCH_REPO_URL} target="_blank" rel="noreferrer">
          GitHub
        </a>{" "}
        and is covered by the license stated in that repository, not by these terms.
      </p>
    </LegalSection>

    <LegalSection title="Acceptable use">
      <p>
        NetBench generates real, potentially heavy HTTP traffic. You may only use it against systems
        that you own or that you have explicit permission to load-test. In particular, you must not:
      </p>
      <ul>
        <li>
          send load to third-party websites, APIs or networks without their operator's consent;
        </li>
        <li>
          use NetBench to disrupt, degrade or deny service to anyone — that is a denial-of-service attack
          and is illegal in most countries;
        </li>
        <li>
          bypass rate limits, access controls or other protection measures of a system you are not
          authorised to test;
        </li>
        <li>
          break the terms of your hosting or cloud provider, many of which require notice before load
          or penetration testing.
        </li>
      </ul>
      <p>
        You are solely responsible for the targets you configure and for the traffic NetBench sends on
        your behalf.
      </p>
    </LegalSection>

    <LegalSection title="Costs and side effects">
      <p>
        Load tests consume bandwidth and server resources. You are responsible for any costs that
        result — for example mobile data charges, cloud egress fees, autoscaling bills or alerts
        triggered on the systems you test. Start with low concurrency and short durations, and avoid
        running tests against production during peak hours unless you have planned for it.
      </p>
    </LegalSection>

    <LegalSection title="Measurements">
      <p>
        NetBench reports what it observes from your device: throughput, latency and errors depend on
        your network, the device's performance and everything between it and the target. Treat the
        results as measurements to interpret, not as guarantees of how a service behaves for other
        users.
      </p>
    </LegalSection>

    <LegalSection title="No warranty">
      <p>
        NetBench is provided free of charge and "as is", without warranties of any kind, express or
        implied, including fitness for a particular purpose and uninterrupted or error-free operation.
      </p>
    </LegalSection>

    <LegalSection title="Limitation of liability">
      <p>
        To the maximum extent permitted by law, {NETBENCH_DEVELOPER} is not liable for any direct,
        indirect, incidental or consequential damages arising from the use of NetBench, including
        service outages, data loss or costs caused by tests you run.
      </p>
    </LegalSection>

    <LegalSection title="Privacy">
      <p>
        NetBench does not collect personal data. See the{" "}
        <Link to="/netbench/privacy">privacy policy</Link> for details.
      </p>
    </LegalSection>

    <LegalSection title="Changes">
      <p>
        These terms may be updated as the app evolves. The date at the top of the page shows the latest
        version; continuing to use NetBench after a change means you accept the updated terms.
      </p>
    </LegalSection>

    <LegalSection title="Contact">
      <p>
        Questions about these terms can be raised in{" "}
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

export default NetBenchTerms;
