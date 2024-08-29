import { Container, Tab, Tabs } from "react-bootstrap";
import { useSwaps } from "../../contexts/SwapsContext";
import FullPageSpinner from "../../components/FullPageSpinner";
import SwapItem from "../../components/SwapItem";

function Swap() {
  const { swaps, isLoading } = useSwaps();

  const pendingSwaps = swaps?.filter((el) => el.status === "pending");
  const acceptedSwaps = swaps?.filter(
    (el) => el.status === "accepted" && el.completed === false
  );
  const rejectedSwaps = swaps?.filter((el) => el.status === "rejected");
  const completedSwaps = swaps?.filter((el) => el.completed === true);

  if (isLoading) return <FullPageSpinner />;

  return (
    <Container fluid className="mx-5">
      <h1>Your Swaps</h1>
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
          {pendingSwaps?.map((swap) => (
            <SwapItem swap={swap} key={swap.swap_id} />
          ))}
        </Tab>
        <Tab
          eventKey="accepted"
          title={`Accepted (${pendingSwaps ? pendingSwaps.length : 0})`}
        >
          {acceptedSwaps?.map((swap) => (
            <SwapItem swap={swap} key={swap.swap_id} />
          ))}
        </Tab>
        <Tab
          eventKey="rejected"
          title={`Rejected (${pendingSwaps ? pendingSwaps.length : 0})`}
        >
          {rejectedSwaps?.map((swap) => (
            <SwapItem swap={swap} key={swap.swap_id} />
          ))}
        </Tab>
        <Tab
          eventKey="completed"
          title={`Completed (${pendingSwaps ? pendingSwaps.length : 0})`}
        >
          {completedSwaps?.map((swap) => (
            <SwapItem swap={swap} key={swap.swap_id} />
          ))}
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Swap;
