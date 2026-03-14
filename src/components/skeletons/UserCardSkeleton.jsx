import { Skeleton, Flex, Box } from "@radix-ui/themes";

export default function UserCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex justify-between">
      <Flex gap="4">
        
        {/* Avatar */}
        <Skeleton width="56px" height="56px" style={{ borderRadius: "9999px" }} />

        <Flex direction="column" gap="2">
          
          {/* Name */}
          <Skeleton width="120px" height="16px" />

          {/* Email */}
          <Skeleton width="180px" height="14px" />

          {/* Department */}
          <Skeleton width="100px" height="14px" />

        </Flex>
      </Flex>

      {/* Menu icon */}
      <Box>
        <Skeleton width="20px" height="20px" />
      </Box>
    </div>
  );
}
