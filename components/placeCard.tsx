import { Place } from "@/types";

export default function PlaceCard({
  id,
  displayName,
  formattedAddress,
}: Place) {
  return (
    <div key={id} className="card lg:card-side w-full bg-base-100 shadow-xl">
      {/* <figure>
                <img src={websiteUri} alt={displayName.text} />
              </figure> */}
      <div className="card-body">
        <h2 className="card-title">{displayName.text}</h2>
        <p>{formattedAddress}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Detail</button>
        </div>
      </div>
    </div>
  );
}
