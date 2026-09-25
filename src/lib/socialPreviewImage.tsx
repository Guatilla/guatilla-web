import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const SOCIAL_IMAGE_ALT =
  "Kaffe Guatilla – familiedyrket colombiansk spesialkaffe";

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

export const SOCIAL_IMAGE_CONTENT_TYPE = "image/png";

const coffeeImageData = await readFile(
  join(process.cwd(), "public", "assets", "cerezas-cosecha.jpg"),
  "base64",
);
const coffeeImageSrc = `data:image/jpeg;base64,${coffeeImageData}`;

export function createSocialPreviewImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#f4eadc",
        color: "#fff7e9",
      }}
    >
      <div
        style={{
          width: "47%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 52px 50px",
          backgroundColor: "#203d33",
          borderRight: "12px solid #d69a2d",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 3,
              color: "#efb649",
            }}
          >
            COLOMBIA&nbsp;&nbsp;→&nbsp;&nbsp;NORGE
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 42,
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 0.94,
              letterSpacing: -2,
            }}
          >
            <span>KAFFE</span>
            <span>GUATILLA</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              maxWidth: 420,
              fontSize: 29,
              lineHeight: 1.2,
              color: "#f4d9b6",
            }}
          >
            Familiedyrket spesialkaffe
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 1.5,
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              marginRight: 14,
              backgroundColor: "#c9512c",
            }}
          />
          guatilla.no
        </div>
      </div>

      <div
        style={{
          position: "relative",
          width: "53%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* ImageResponse renders standard img elements into the generated card. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coffeeImageSrc}
          alt=""
          width={636}
          height={630}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 34,
            bottom: 32,
            display: "flex",
            padding: "12px 18px",
            backgroundColor: "#f4eadc",
            color: "#2f231b",
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: 1.5,
          }}
        >
          DIREKTE HANDEL · FULL SPORBARHET
        </div>
      </div>
    </div>,
    SOCIAL_IMAGE_SIZE,
  );
}
