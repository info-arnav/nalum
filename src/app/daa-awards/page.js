import Image from "next/image";

export default function DAAA() {
  return (
    <div style={{ margin: 10 }}>
      <center>
        <h1 style={{ fontWeight: "bold", fontSize: 32, marginBottom: 40 }}>
          Distinguished Alumni Awards(DAA) for DIT/NSIT/NSUT
        </h1>
        <div style={{ fontWeight: "bold", marginBottom: 20, fontSize: 30 }}>
          Year 2023
        </div>
        <Image
          src="/daa/raman-nagpal.png"
          width={300}
          height={300}
          style={{ borderRadius: "100%" }}
        ></Image>
        <div style={{ fontWeight: "bold", marginTop: 10, fontSize: 20 }}>
          Raman Nagpal
        </div>
        <p style={{ maxWidth: 700 }}>
          Mr. Raman Nagpal, a 1994 graduate from the COE, is being honored with
          the Distinguished Alumni Award in recognition of his significant
          contributions during the COVID-19 pandemic. He played a crucial role
          in arranging oxygen concentrators and establishing other medical
          facilities at the university.{" "}
        </p>
      </center>
    </div>
  );
}
