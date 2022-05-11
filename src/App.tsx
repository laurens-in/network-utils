import { KeyboardEventHandler, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ipaddr from "ipaddr.js";

function App() {
  const [entropy, setEntropy] = useState<number | null>(null);
  const [shortIP, setShortIP] = useState<string | null>(null);
  const [netMask4, setNetMask4] = useState<string | null>(null);
  const [netMask6, setNetMask6] = useState<string | null>(null);
  const [prefix4, setPrefix4] = useState<number | null>(null);
  const [prefix6, setPrefix6] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const entropyFrom = (x: string): number => {
    const array = Array.from(x);
    return Math.abs(
      Object.values(
        array.reduce(
          (cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt),
          {} as { [key: string]: number }
        )
      )
        .map((x) => x / array.length)
        .reduce((a, b, i) => a + b * Math.log2(b), 0)
    );
  };

  const shortenIPv6 = (x: string) =>
    ipaddr.IPv6.isIPv6(x)
      ? ipaddr.IPv6.parse(x).toString()
      : "not a valid ipv6";

  const handleEnter = (e: React.KeyboardEvent) =>
    e.code === "Enter" ? (e.target as HTMLElement).blur() : null;

  interface CopyProps {
    text: string;
  }
  const Copy = (props: CopyProps) => (
    <button
      onClick={() => {
        navigator.clipboard.writeText(props.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }}
    >
      copy
    </button>
  );

  return (
    <div className="App">
      <h1>Networking Utils</h1>
      <label htmlFor="entropyIn">Calculate Shannon Entropy</label>
      <div className="form">
        <input
          onKeyDown={handleEnter}
          onBlur={(e) =>
            e.target.value !== ""
              ? setEntropy(entropyFrom(e.target.value))
              : setEntropy(null)
          }
          id="entropyIn"
        ></input>
        {entropy && (
          <>
            <p>{entropy}</p> <Copy text={entropy.toString()} />
          </>
        )}
      </div>
      <label htmlFor="ipIn">Shorten IPv6</label>
      <div className="form">
        <input
          onKeyDown={handleEnter}
          onBlur={(e) =>
            e.target.value !== ""
              ? setShortIP(shortenIPv6(e.target.value))
              : setShortIP(null)
          }
          id="ipIn"
        ></input>
        {shortIP && (
          <>
            <p>{shortIP}</p> <Copy text={shortIP} />
          </>
        )}
      </div>
      <label htmlFor="netmask4">IPv4 Netmask from Prefix</label>
      <div className="form">
        <input
          onKeyDown={handleEnter}
          onBlur={(e) =>
            e.target.value !== ""
              ? setNetMask4(
                  ipaddr.IPv4.subnetMaskFromPrefixLength(
                    parseInt(e.target.value)
                  ).toString()
                )
              : setNetMask4(null)
          }
          id="netmask4"
        ></input>
        {netMask4 && (
          <>
            <p>{netMask4}</p> <Copy text={netMask4} />
          </>
        )}
      </div>
      <label htmlFor="prefix4">IPv4 Prefix from Netmask</label>
      <div className="form">
        <input
          onKeyDown={handleEnter}
          onBlur={(e) =>
            e.target.value !== "" && ipaddr.IPv4.isIPv4(e.target.value)
              ? setPrefix4(
                  ipaddr.IPv4.parse(e.target.value).prefixLengthFromSubnetMask()
                )
              : setPrefix4(null)
          }
          id="prefix4"
        ></input>
        {prefix4 && (
          <>
            <p>{prefix4}</p> <Copy text={prefix4.toString()} />
          </>
        )}
      </div>

      <label htmlFor="netmask6">IPv6 Netmask from Prefix</label>
      <div className="form">
        <input
          onKeyDown={handleEnter}
          onBlur={(e) =>
            e.target.value !== ""
              ? setNetMask6(
                  ipaddr.IPv6.subnetMaskFromPrefixLength(
                    parseInt(e.target.value)
                  ).toNormalizedString()
                )
              : setNetMask6(null)
          }
          id="netmask6"
        ></input>
        {netMask6 && (
          <>
            <p>{netMask6}</p> <Copy text={netMask6} />
          </>
        )}
      </div>
      <label htmlFor="prefix6">IPv6 Prefix from Netmask</label>
      <div className="form">
        <input
          onKeyDown={handleEnter}
          onBlur={(e) =>
            e.target.value !== "" && ipaddr.IPv6.isIPv6(e.target.value)
              ? setPrefix6(
                  ipaddr.IPv6.parse(e.target.value).prefixLengthFromSubnetMask()
                )
              : setPrefix6(null)
          }
          id="prefix6"
        ></input>
        {prefix6 && (
          <>
            <p>{prefix6}</p> <Copy text={prefix6.toString()} />
          </>
        )}
      </div>
      {copied && <div id="copied">copied to clipboard</div>}
    </div>
  );
}

export default App;
