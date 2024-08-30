import { Container, Tab, Tabs, Row } from "react-bootstrap";
import { useSwaps } from "../../contexts/SwapsContext";
import { useUser } from "../../contexts/UserContext";

import SwapsTable from "../../components/SwapsTable";
import FullPageSpinner from "../../components/FullPageSpinner";
import SwapsPendingRow from "../../components/SwapsPendingRow";
import SwapsAcceptedRow from "../../components/SwapsAcceptedRow";
import SwapsRejectedRow from "../../components/SwapsRejectedRow";
import SwapsYourSwapsRow from "../../components/SwapsYourSwapsRow";
import SwapsCompletedRow from "../../components/SwapsCompletedRow";

function Swap() {
  const { swaps, isLoading: swapsLoading } = useSwaps();
  const { user, isLoading: userLoading } = useUser();

  const loading = swapsLoading || userLoading;

  const pendingSwaps = swaps?.filter(
    (el) => el.status === "pending" && el.user_offered === user.user_id
  );
  const acceptedSwaps = swaps?.filter(
    (el) => el.status == "accepted" && el.completed !== true
  );

  const completedSwaps = swaps?.filter(
    (el) => el.completed === true && user.user_id !== el.user_requesting
  );

  if (loading) return <FullPageSpinner />;

  return (
    <Container fluid className="mx-5">
      <Row>
        <h1>Your Swaps</h1>
      </Row>

      <Row>
        <Tabs
          defaultActiveKey="pending"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab
            eventKey="pending"
            title={`Pending (${pendingSwaps ? pendingSwaps.length : 0})`}
          >
            <SwapsTable
              onRender={pendingSwaps.map((swap) => (
                <SwapsPendingRow swap={swap} key={swap.id} />
              ))}
            />
          </Tab>
          <Tab
            eventKey="accepted"
            title={`Accepted (${acceptedSwaps ? acceptedSwaps.length : 0})`}
          >
            <SwapsTable
              onRender={acceptedSwaps.map((swap) => (
                <SwapsAcceptedRow swap={swap} key={swap.id} />
              ))}
            />
          </Tab>
          <Tab
            eventKey="completed"
            title={`Completed (${completedSwaps ? completedSwaps.length : 0})`}
          >
            <SwapsTable
              onRender={completedSwaps.map((swap) => (
                <SwapsCompletedRow swap={swap} key={swap.id} />
              ))}
            />
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
}

export default Swap;
