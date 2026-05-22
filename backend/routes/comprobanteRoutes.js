const express = require("express");

const fs = require("fs");

const path = require("path");

const xml2js = require("xml2js");

const router = express.Router();

const {
  enviarComprobante
} = require("../services/nubefactService");

const {
  obtenerXML
} = require("../services/xmlService");

const {
  generarPDF
} = require("../services/pdfService");

const {
  guardarReserva
} = require("../services/reservaService");

router.post(

  "/generar-comprobante",

  async (req, res) => {

    try {

      console.log("DATOS FRONTEND:");

      console.log(req.body);

      // 1 NUBEFACT

      const respuestaNubefact =

        await enviarComprobante(
          req.body
        );

      console.log("RESPUESTA NUBEFACT:");

      console.log(
        JSON.stringify(
          respuestaNubefact,
          null,
          2
        )
      );

      await guardarReserva({

        ...req.body,
      
        serie:
          respuestaNubefact.serie,
      
        numero:
          respuestaNubefact.numero,
      
        estadoSunat:
          respuestaNubefact.aceptada_por_sunat
            ? "ACEPTADO"
            : "PENDIENTE",
      
        xmlURL:
          respuestaNubefact.enlace_del_xml,
      
        pdfURL:
          respuestaNubefact.enlace_del_pdf
      });

      // 2 XML URL

      const xmlURL =

        respuestaNubefact.enlace_del_xml;

      console.log("XML URL:");

      console.log(xmlURL);

      if (!xmlURL) {

        return res.status(500).json({

          success: false,

          message: "No se obtuvo XML"
        });
      }

      // 3 DESCARGAR XML

      const xmlContent =

        await obtenerXML(xmlURL);

      // 4 PARSEAR XML

      const parser =
        new xml2js.Parser();

      parser.parseString(

        xmlContent,

        async (err, result) => {

          if (err) {

            console.error(err);

            return res.status(500).json({

              success: false
            });
          }

          try {

            const invoice =
              result["Invoice"];

            console.log(result);
            // 5 GENERAR PDF

            const pdfPath = path.join(

              __dirname,

              "../generated",

              "ticket.pdf"
            );
            console.log("GENERANDO PDF...");
            await generarPDF(
              invoice,
              pdfPath
            );
            console.log("PDF GENERADO");
            // 6 RETORNAR PDF

            res.download(pdfPath, "ticket.pdf", () => {
              fs.unlinkSync(pdfPath);
            }
            );

          } catch (error) {

            console.error(error);

            res.status(500).json({

              success: false
            });
          }
        }
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false
      });
    }
  }
);

module.exports = router;