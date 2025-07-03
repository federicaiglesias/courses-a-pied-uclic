export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Runner Icon */}
        <div className="mb-8">
          <div className="inline-block text-8xl animate-bounce">🏃‍♂️</div>
        </div>

        {/* Loading Text */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Chargement en cours...
        </h2>


        {/* Animated Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

      </div>
    </div>
  );
}
