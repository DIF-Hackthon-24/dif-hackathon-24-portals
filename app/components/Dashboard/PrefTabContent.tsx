import { useCallback, useEffect, useState } from "react";

type PrefTabContentProps = {
  protocol: string;
  attributes: { query: string; display: string }[];
};

export default function PrefTabContent(props: PrefTabContentProps) {
  const [polling, setPolling] = useState<boolean>(true);
  const [grantId, setGrantId] = useState<string>("");
  const [records, setRecords] = useState<{ [key: string]: string }>({});

  // const pollEndpoint = useCallback(async () => {
  //   console.log("protocol", props.protocol);
  //   try {
  //     const response = await fetch(
  //       `/api/permissions/grant?protocol=https://dif-hackathon-2024/schemas/${props.protocol}&action=read`,
  //       {
  //         method: "GET"
  //       }
  //     );
  //     const data = await response.json();
  //     console.log("Data in polling", data);
  //     // Check if permission has been granted
  //     if (data.grantId) {
  //       setPolling(false); // Stop polling when permission grant is successful
  //       setGrantId(data.grantId);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching permission grant result:", error);
  //   }
  // }, [props.protocol]);

  // // poll for permission grant for given protocol
  // useEffect(() => {
  //   // Set up the polling logic
  //   const interval = setInterval(() => {
  //     if (polling) {
  //       console.log("Polling!!");
  //       console.log("Permission request awaiting approval");
  //       pollEndpoint();
  //     } else {
  //       clearInterval(interval); // Stop polling once the condition is met
  //     }
  //   }, 2000); // Poll every 2 seconds

  //   // Cleanup the interval on component unmount
  //   return () => clearInterval(interval);
  // }, [polling, pollEndpoint, props.protocol]);

  // // once we have the permission grant IDs, fetch records for that protocol
  // useEffect(() => {
  //   const fetchRecords = async (protocol: string) => {
  //     console.log("Fetching records");

  //     const protocolPaths = props.attributes.map(
  //       (attribute) => attribute.query
  //     );

  //     console.log("fetching for paths: ", protocolPaths);

  //     const body = JSON.stringify({
  //       protocol: protocol,
  //       protocolPaths: protocolPaths,
  //       permissionGrantId: grantId,
  //       target: "did:key:z6Mkkq7UNpMq9cdYoC5bqG2C4reWkPTgwDzKqBy1Y8utc4gW"
  //     });

  //     const response = await fetch("/api/records/read", {
  //       method: "POST",
  //       body: body
  //     });
  //     const data = await response.json();
  //     console.log("Got records", data);
  //     setRecords(data);
  //   };

  //   if (grantId !== "") {
  //     console.log("Have permissionGrantId, can do records-read now");
  //     fetchRecords(`https://dif-hackathon-2024/schemas/${props.protocol}`);
  //   }
  // }, [grantId]);

  return (
    <div className="mt-6 border-t border-gray-100">
      <dl className="divide-y divide-gray-100">
        {props.attributes.map((att) => (
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {att.display}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {records[att.query]}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
