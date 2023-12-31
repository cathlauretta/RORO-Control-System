"use client";
import { Providers } from "@/app/providers";
import { Text, Textarea, Flex, Button } from "@chakra-ui/react";
import Title from "@/components/Title";
import UploadImage from "@/components/UploadImage";
import LabelInput from "@/components/LabelInput";
import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchData, addReport } from "./repFun";
import { redirect } from "next/navigation";

const ReportAddTemp = ({ params }: { params: { id: string } }) => {
  const [title, setTitle] = useState<string>("");
  const handleTitle = (item: string) => {
    setTitle(item);
    // console.log(item);
  };

  const [repType, setRepType] = useState<string>("Inspect");
  const handleType = (item: string) => {
    item == "Inspect" ? setRepType("Repair") : setRepType(item);
    // console.log("Changed: " + repType);
  };

  const [publicID, setPublicID] = useState<string>("");
  const handlePID = (item: string) => {
    setPublicID(item);
    // console.log(item);
  };

  const [repID, setRepID] = useState<string>("");
  const handleRepID = (item: string) => {
    setRepID(item);
  };

  const [roomID, setRoomID] = useState<string>("");
  const handleRoomID = (item: string) => {
    setRoomID(item);
  };

  const [eic, setEIC] = useState<string>("Failed to Fetch");
  const handleEIC = (item: string) => {
    setEIC(item);
  };

  const [desc, setDesc] = useState<string>("LMAO");
  const handleDesc = (item: string) => {
    setDesc(item);
  };

  useEffect(() => {
    if (repID == "") {
      fetchData(handleRepID);
    }
    if (eic == "Failed to Fetch") {
      handleEIC(params.id);
    }
  }, [repID, eic]);

  return (
    /* I. Whole Page */
    <Providers>
      {/* I.1. Content Area */}
      <Flex
        flexDir="column"
        w="85vw"
        h="108vh"
        mt="40px"
        mx="auto"
        alignItems="end">
        {/* I.1.1. Title & Inspect */}
        <Title titleItem={handleTitle} repTypeItem={handleType} />
        {/* I.1.2. Image & Text Area */}
        <Flex w="85vw" h="600px" paddingTop="40px" gap="40px">
          {/* I.1.2.1. Image */}
          <UploadImage label="Report Image" PID={handlePID} />
          {/* I.1.2.2. Text */}
          <Flex w="full" flexDir="column" gap="28px">
            {/* I.1.2.2.1. Attribute */}
            <Flex w="full" justifyContent="space-between" gap="20px">
              <LabelInput
                label="Report ID"
                disabled={true}
                bg="#DFDFDF"
                value={repID}
                checkValue={handleRepID}
              />
              <LabelInput
                label="Room"
                disabled={false}
                bg="#FFFFFF"
                value={undefined}
                checkValue={handleRoomID}
              />
              <LabelInput
                label="Employee"
                disabled={true}
                bg="#DFDFDF"
                value={eic}
                checkValue={handleEIC}
              />
            </Flex>
            {/* I.1.2.2.2. Textarea */}
            <Flex h="56vh" flexDir="column" gap="12px">
              <Text fontWeight="600"> Report Description </Text>
              <Textarea
                w="full"
                h="full"
                resize="none"
                fontSize="14px"
                fontWeight="400"
                padding="12px"
                border="2px solid #247EC5"
                borderRadius="8px"
                placeholder="Describe the condition of the room"
                onChange={(event) => {
                  handleDesc(event.target.value);
                  // console.log(desc);
                }}
              />
            </Flex>

            {/* I.1.3. Save */}
            <Flex w="full" paddingTop="20px" flexDir="row-reverse">
              <Button
                w="10vw"
                h="40px"
                bg="#39A7FF"
                fontSize="16px"
                color="#FFFFFF"
                _hover={{
                  bgColor: "#2877b7",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
                leftIcon={
                  <Image
                    src="/icons/Save.svg"
                    width={18}
                    height={20}
                    alt="Save Button"
                  />
                }
                onClick={() => {
                  // handleSave();
                  addReport({
                    repID,
                    roomID,
                    eic,
                    desc,
                    title,
                    repType,
                    publicID,
                  });
                  console.log("Passed Save");
                }}>
                Save
              </Button>
              <Button
                w="10vw"
                h="40px"
                borderColor="#39A7FF"
                fontSize="16px"
                variant="unstyled"
                color="#39A7FF"
                _hover={{
                  bgColor: "#F0F0F0",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
                onClick={(event) => (window.location.href = `/report`)}>
                Cancel
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Providers>
  );
};

export default ReportAddTemp;
