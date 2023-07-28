import React from "react";
import {useRouter} from "expo-router";
import {View, Text, TouchableOpacity, ActivityIndicator} from "react-native";

import styles from "./nearby.style";
import {COLORS} from "../../../constants/Index";
import NearbyJobCard from "../../common/Cards/Nearby/NearbyJobCard";
import useFetch from "../../../hook/UseFetch";

const Nearby = () => {
  const router = useRouter();
  const {data, isLoading, error} = useFetch("search", {
    query: "React Native developer",
    num_pages: "1",
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job: any) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearby;
