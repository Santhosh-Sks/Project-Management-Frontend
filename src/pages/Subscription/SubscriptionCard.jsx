import { Button } from "@/components/ui/button";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const SubscriptionCard = ({ data }) => {
  return (
    <div
      role="group"
      className="rounded-xl bg-[#1b1b1b] bg-opacity-20 
      shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem]"
    >
      <p className="text-lg font-medium">{data.planName}</p>

      <p>
        <span className="text-xl font-semibold">₹{data.price}</span>{" "}
        <span className="text-gray-400">/{data.planType.toLowerCase()}</span>
      </p>

      {data.planType === "ANNUALLY" && <p className="text-green-400">30% off</p>}

      <Button className="w-full">{data.buttonName}</Button>

      <div className="mt-4 space-y-2">
        {data.features?.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-gray-300">
            <CheckCircledIcon className="text-green-400" />
            <p className="text-sm">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionCard;
