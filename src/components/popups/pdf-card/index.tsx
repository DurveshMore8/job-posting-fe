import { Dispatch, FunctionComponent, SetStateAction, useRef } from "react";
import "./style.css";
import Close from "@/components/icons/close";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Button from "@/components/button";

interface PdfCardProps {
  view: boolean;
  setView: Dispatch<SetStateAction<boolean>>;
  consultation: { [key: string]: any };
}

const PdfCard: FunctionComponent<PdfCardProps> = ({
  view,
  setView,
  consultation,
}) => {
  const date = new Date(consultation.dateBooked);

  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (printRef.current) {
      // Capture the content of the div as an image
      const canvas = await html2canvas(printRef.current);
      const imgData = canvas.toDataURL("image/png");

      // Create a PDF document
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add new pages if the image height exceeds page height
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save("download.pdf");
    }
  };

  return (
    <div className={`pdf-popup ${view && "show"}`}>
      <div className="pdf-popup-section">
        <div onClick={() => setView(false)} className="pdf-close">
          <Close />
        </div>
        <div ref={printRef} className="downloadable-div">
          <div className="section-one">
            <h2>{consultation.patientName}</h2>
            <p>Illness: {consultation.illness}</p>
            <p>
              Date:{" "}
              {`${date.getDay()} - ${date.getMonth()} - ${date.getFullYear()}`}
            </p>
          </div>
          <div className="section-two">
            <h3>Care Taken:</h3>
            <textarea
              readOnly
              value={consultation.careTaken}
              className="static-textarea"
            ></textarea>
            <div className="downloadable-gap"></div>
            <h3>Medicines:</h3>
            <textarea
              readOnly
              value={consultation.medicines}
              className="static-textarea"
            ></textarea>
          </div>
          <div className="section-three">
            <p className="doctor-signature">Dr. {consultation.doctorName}</p>
          </div>
        </div>
        <div className="download-button">
          <Button value="Download" onClick={handleDownloadPDF} />{" "}
        </div>
      </div>
    </div>
  );
};

export default PdfCard;
