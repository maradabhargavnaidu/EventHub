import { Loader } from "lucide-react";

const Loaders = ({ head }: { head: string }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e]/90 backdrop-blur-md border border-white/10 rounded-xl p-6 flex items-center gap-3">
        <Loader className="w-6 h-6 animate-spin text-purple-400" />
        <span className="text-white">{head}</span>
      </div>
    </div>
  );
};

export default Loaders;
